import { Response, Request, NextFunction } from "express";
import { FaunaSession } from "../models/models";
import { DocumentT, fql } from "fauna";
import faunaClient from "../config/fauna_client";

type AuthController = {
    signUp: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    signIn: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    signOut: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    verify: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getVerificationCode: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    changePassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updatePassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    recoverAccount: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};

const sessionProjection = fql `
    blog {
        session_id,
        expiresAt,
        user
    }
`;

const blogController: AuthController = {
    signUp: async (req: Request, res: Response, next: NextFunction) => {
        
    },
    signIn: async (req: Request, res: Response, next: NextFunction) => {

    },
    signOut: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cookies = req.cookies;

            if (!cookies?.session_id) {
                res.sendStatus(204);
                return;
            }
    
            const cookieSessionId = cookies.session_id;
    
            const {data: session} = await faunaClient.query<DocumentT<FaunaSession>>(
                fql `let blog = Blog.bySessionId(${cookieSessionId}).delete()
                ${sessionProjection}`
            );
    
            res.clearCookie('session_id', { httpOnly: true, sameSite: 'strict', secure: true });
            res.status(200).json({
                    success: true,
                    message: "Logged out!",
                }
            );
        } catch (error) {
            next(error);
        }
    },
    verify: async (req: Request, res: Response, next: NextFunction) => {
        
    },
    getVerificationCode: async (req: Request, res: Response, next: NextFunction) => {

    },
    changePassword: async (req: Request, res: Response, next: NextFunction) => {
        
    },
    updatePassword: async (req: Request, res: Response, next: NextFunction) => {
        
    },
    recoverAccount: async (req: Request, res: Response, next: NextFunction) => {
        
    }
};

export default blogController;