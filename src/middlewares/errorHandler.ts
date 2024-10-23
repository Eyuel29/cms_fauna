import { Request, Response, NextFunction} from "express";

interface CustomError extends Error {
    statusCode?: number;
    code?: string;
}

const errorHandler = (err: CustomError, req: Request, res: Response, next : NextFunction) => {
    const statusCode = err.statusCode || 500;
    
    res.status(statusCode).json({
        success: false,
        message: err.message || 'An unknown error occurred',
        code: err.code || 'INTERNAL_SERVER_ERROR',
    });
};

export default errorHandler;