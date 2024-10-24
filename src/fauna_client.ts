import {Client} from 'fauna';
import dotenv from 'dotenv';
dotenv.config();

class FaunaClient {
  private static instance: Client;
  private constructor() {}

  public static getClient(): Client {
    if (!FaunaClient.instance) {
        FaunaClient.instance = new Client(
        {secret: process.env.FAUNA_SERVER_KEY || ""}
      );
    }
    return FaunaClient.instance;
  }
}

export default FaunaClient;
