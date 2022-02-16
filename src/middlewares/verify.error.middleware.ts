import { NextFunction, Request, Response } from "express";

export const verifyError = (error: any, req: Request, res: Response, next: NextFunction) => {
    if (error) {
      return res.status(error.statusCode).json({ message: error.message });
    }
  return next()
};