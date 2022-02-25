import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
//import { ResponseError } from "../errors";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  //comentei porque não estava conseguindo pegar o erro no controller
  if (!token) {
    //throw new ResponseError('Missing authorization headers', 401)
    return res.status(401).json({ message: "Missing authorization headers" });
  }

  jwt.verify(token, process.env.SECRET as string, async (err, decoded: any) => {
    if (err) {
      //throw new ResponseError('invalid token', 401)
      return res.status(401).json({ message: "invalid token" });
    }

    const userId = decoded.uuid;

    req.user = { id: userId };
    req.idUser = userId;

    next();
  });
};
