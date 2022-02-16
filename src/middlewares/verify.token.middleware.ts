import { NextFunction, Request, Response } from "express";
import jwt  from "jsonwebtoken";
import { ResponseError } from "../errors";

export const verifyToken =async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization?.split(' ')[1]
    
    if(!token){
        throw new ResponseError('Missing authorization headers', 401) 
    }

    jwt.verify(token, process.env.SECRET as string, async (err, decoded) => {
        if(err){
            throw new ResponseError('invalid token', 401)
        }

        next()
    })

}   