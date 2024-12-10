import { Response, Request, NextFunction } from "express";

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

const blogController: AuthController = {
    signUp: async (req: Request, res: Response, next: NextFunction) => {

    },
    signIn: async (req: Request, res: Response, next: NextFunction) => {

    },
    signOut: async (req: Request, res: Response, next: NextFunction) => {
        
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