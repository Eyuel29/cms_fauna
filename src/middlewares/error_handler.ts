import { Response, NextFunction} from "express";
import { MulterError } from "multer";
import {
    FaunaError,
    ServiceError,
    QueryRuntimeError,
    QueryCheckError,
    InvalidRequestError,
    ConstraintFailureError,
    AbortError,
    AuthenticationError,
    AuthorizationError,
    ContendedTransactionError,
    ThrottlingError,
    QueryTimeoutError,
    ServiceInternalError,
    ClientError,
    ClientClosedError,
    NetworkError,
    ProtocolError
} from "fauna";

const errorHandler = (err: any, req: Request, res: Response, next : NextFunction) => {
    const statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV !== "production") console.error(err);

    if (err instanceof MulterError) {
      res.status(400).json({
        success: false,
        message: err?.message || 'Failed to upload a file!'
      });
      return;
    }

    if (err instanceof FaunaError) {
      handleFaunaError(err, res);
      return;
    }

    res.status(statusCode).json({
        success: false,
        message: err?.message || 'An unknown error occurred',
        code: err?.code || 'INTERNAL_SERVER_ERROR',
    });
};

const handleFaunaError = (err: FaunaError, res: Response) =>{
  let statusCode;
  let message;

  if (err instanceof ServiceError) {
    statusCode = 503;
    message = "Service is currently unavailable. Please try again later.";
  } else if (err instanceof QueryRuntimeError) {
    statusCode = 400;
    message = "A query error occurred. Please check your request.";
  } else if (err instanceof QueryCheckError) {
    statusCode = 400;
    message = "A query validation error occurred. Please try again.";
  } else if (err instanceof InvalidRequestError) {
    statusCode = 400;
    message = "Invalid request. Please verify your input.";
  } else if (err instanceof ConstraintFailureError) {
    statusCode = 409;
    message = "A data constraint was violated. Please retry.";
  } else if (err instanceof AbortError) {
    statusCode = 409;
    message = "The operation was aborted. Please try again.";
  } else if (err instanceof AuthenticationError) {
    statusCode = 401;
    message = "Authentication failed. Please provide valid credentials.";
  } else if (err instanceof AuthorizationError) {
    statusCode = 403;
    message = "You are not authorized to perform this action.";
  } else if (err instanceof ContendedTransactionError) {
    statusCode = 409;
    message = "A transaction conflict occurred. Please retry.";
  } else if (err instanceof ThrottlingError) {
    statusCode = 429;
    message = "Too many requests. Please try again later.";
  } else if (err instanceof QueryTimeoutError) {
    statusCode = 504;
    message = "The query timed out. Please try again later.";
  } else if (err instanceof ServiceInternalError) {
    statusCode = 500;
    message = "An internal error occurred. Please try again later.";
  } else if (err instanceof ClientError) {
    statusCode = 400;
    message = "A client error occurred. Please check your request.";
  } else if (err instanceof ClientClosedError) {
    statusCode = 499;
    message = "The client closed the connection prematurely.";
  } else if (err instanceof NetworkError) {
    statusCode = 502;
    message = "A network error occurred. Please try again later.";
  } else if (err instanceof ProtocolError) {
    statusCode = 500;
    message = "A protocol error occurred. Please try again later.";
  } else {
    statusCode = 500;
    message = "An unknown error occurred. Please try again later.";
  }

  res.status(statusCode).json({
    success: false,
    message
  });
}

export default errorHandler;