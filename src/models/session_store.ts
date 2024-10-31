import session from "express-session";
import FaunaClient from "../fauna_client";
import { fql, DocumentT, DateStub } from "fauna";

type FaunaSession = {
  sid: string;
  data: session.SessionData;
  expiresAt: Date;
};

class AuthSessionStore extends session.Store {
  private client = FaunaClient.getClient();

  async get(sid: string, callback: (err: any, session?: session.SessionData | null) => void): Promise<void> {
    try {
      const { data } = await this.client.query(
        fql`let session = Session.byId(${sid})
            { data: session.data }`
      );
      callback(null, data?.data || null);
    } catch (error) {
      callback(error);
    }
  }

  async set(sid: string, sessionData: session.SessionData, callback?: (err?: any) => void): Promise<void> {
    const expiresAt = DateStub.fromDate(new Date(Date.now() + (sessionData.cookie.maxAge || 86400000)));

    try {
      await this.client.query(
        fql`
          let session = Session.createOrUpdate({
            sid: ${sid},
            data: ${JSON.stringify(sessionData)},
            expiresAt: ${expiresAt}
          })`
      );
      callback && callback(null);
    } catch (error) {
      callback && callback(error);
    }
  }

  async destroy(sid: string, callback?: (err?: any) => void): Promise<void> {
    try {
      await this.client.query(
        fql`let session = Session.byId(${sid}).delete()`
      );
      callback && callback(null);
    } catch (error) {
      callback && callback(error);
    }
  }
}
