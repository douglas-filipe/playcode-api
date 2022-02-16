import { Handler, NextFunction, Request, Response } from "express";

export const Resolver = (handlerFn: Handler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(handlerFn(req, res, next)).catch((e) => next(e));
  };
};
