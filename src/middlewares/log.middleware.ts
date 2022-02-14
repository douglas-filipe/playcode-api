import { NextFunction, Request, Response } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  let time = new Date().toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  console.log(`[app] ${req.ip} - - [${time}] "${req.url} ${req.method} ${req.protocol}/${req.httpVersion}"`);
  next();
};
