import { NextFunction, Response } from "express";
import multer from "multer";

export const validateCerfiticate = (req: Request, res: Response, next: NextFunction) =>{
    const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fieldNameSize: 64,
      fileSize: 2 * 1024 * 1024,
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

export const validateProfilePicture = (req: Request, res: Response, next: NextFunction) =>{
  const allowedimageTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/jpg',
    'image/jiff'
  ];
  const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fieldNameSize: 128,
    fileSize: 1 * 1024 * 1024,
  },
  fileFilter: (req: Request, file: any, cb: any) =>{
    if (!allowedimageTypes.find(file.mimetype)) {
      return cb(new Error('Invaid image format!'));
    }
    cb(null, true);
  }
}).single("profile_picture");

upload(req, res, (err:any) =>{
  next(err);
  return;
});
}


export const validateVideo = (req: Request, res: Response, next: NextFunction) =>{
  const allowedVideoTypes = [
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/avi',
    'video/mov'
  ];
  const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fieldNameSize: 128,
    fileSize: 100 * 1024 * 1024,
  },
  fileFilter: (req: Request, file: any, cb: any) =>{
    if (!allowedVideoTypes.find(file.mimetype)) {
      return cb(new Error('Invaid video format!'));
    }
    cb(null, true);
  }
}).single("video");

upload(req, res, (err:any) =>{
  next(err);
  return;
});
}