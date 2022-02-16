import { Request, Response } from "express";
import { UsersServices } from "../services";
import jwt from 'jsonwebtoken'

export class UsersControllers {
  
  async CreateUser(req: Request, res: Response): Promise<Response> {
    const usersServices = new UsersServices();
    const user = await usersServices.CreateUser(req.body);
    return res.status(201).json(user);
  }

}
