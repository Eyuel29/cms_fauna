import { Response, Request } from "express";
import FaunaClient from "../fauna_client";
import { DateStub, DocumentT, fql, QueryRuntimeError, QueryTimeoutError } from "fauna";
import { User } from "../models/models";

type AuthController = {
    signUp: (req: Request, res: Response) => Promise<void>;
    signIn: (req: Request, res: Response) => Promise<void>;
    signOut: (req: Request, res: Response) => Promise<void>;
    verify: (req: Request, res: Response) => Promise<void>;
    getVerificationCode: (req: Request, res: Response) => Promise<void>;
    changePassword: (req: Request, res: Response) => Promise<void>;
    updatePassword: (req: Request, res: Response) => Promise<void>;
    recoverAccount: (req: Request, res: Response) => Promise<void>;
};

const blogController: AuthController = {
    signUp: async (req: Request, res: Response) => {
          
    },
    signIn: async (req: Request, res: Response) => {

    },
    signOut: async (req: Request, res: Response) => {
        
    },
    verify: async (req: Request, res: Response) => {

    },
    getVerificationCode: async (req: Request, res: Response) => {

    },
    changePassword: async (req: Request, res: Response) => {
        
    },
    updatePassword: async (req: Request, res: Response) => {
        
    },
    recoverAccount: async (req: Request, res: Response) => {
        
    }
};

export default blogController;