import { Request, Response } from "express";
import { UsersServices } from "../services";

export class UsersControllers {
  usersServices = new UsersServices();
  async CreateUser(req: Request, res: Response) {
    const user = await this.usersServices.CreateUser(req.body);
    res.status(201).json(user);
  }
}
