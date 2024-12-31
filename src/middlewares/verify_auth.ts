import { Response, NextFunction, Request} from 'express';
import { DocumentT, fql } from 'fauna';
import faunaClient from '../config/fauna_client';
import { FaunaSession, User } from '../types/models';

const verifyAuth = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const session_id = req?.cookies?.session;    
        const sessionProjection = fql `
            session {
                id,
                session_id,
                user
            }
        `;
    
        const {data: session} = await faunaClient.query<DocumentT<FaunaSession>>(
            fql `let session = FaunaSession.bySessionId(${session_id ?? "234523452345345"})!
            ${sessionProjection}`
        );



        if (!session || !session.user.id || !session.user.user_role) {
            res.status(500).json({
                success: false,
                message: "Something went wrong!"
            })

            return;
        }

        req.user_id = session?.user?.id?.toString();
        req.user_role = Number(session?.user?.user_role);

        res.end();
    } catch (error) {
        next(error);
    }
}

export default verifyAuth;