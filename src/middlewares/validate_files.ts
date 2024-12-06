import { NextFunction, Request, Response } from "express";
import multer from "multer";

export const validateCerfiticate = (req: Request, res: Response, next: NextFunction) =>{
    const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fieldNameSize: 64,
      fileSize: 1 * 1024 * 1024,
    },
    fileFilter: (req: Request, file: any, cb: any) =>{
      if (file.mimetype !== 'application/pdf') {
        return cb(new Error('Only PDF files are allowed.'));
      }
      cb(null, true);
    }
  }).single("certificate");

  upload(req, res, (err:any) =>{
    next(err);
    return;
  });
}