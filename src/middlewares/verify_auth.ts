import {Request, Response, NextFunction} from 'express';
import { DocumentT, fql } from 'fauna';
import faunaClient from '../config/fauna_client';
import { FaunaSession } from '../models/models';

const verifyAuth = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const session_id = req?.cookies?.session;    
        const sessionProjection = fql `
            session {
                session_id,
                user
            }
        `;
    
        const {data: session} = await faunaClient.query<DocumentT<FaunaSession>>(
            fql `let session = FaunaSession.bySessionId(${session_id ?? "234523452345345"})!
            ${sessionProjection}`
        );
    
        console.log(session);
        res.end();
    } catch (error) {
        next(error);
    }
}

export default verifyAuth;