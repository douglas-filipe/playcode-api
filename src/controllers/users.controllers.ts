import { Request, Response } from "express";
import { io } from "../app";
import { ResponseError } from "../errors";

import { UsersServices } from "../services";

export class UsersControllers {
  static async CreateUser(req: Request, res: Response): Promise<Response> {
    const usersServices = new UsersServices();
    const user = await usersServices.CreateUser(req.body);
    return res.status(201).json(user);
  }

  static async LoginUser(req: Request, res: Response): Promise<Response> {
    const userService = new UsersServices();
    try {
      const user = await userService.Authenticate(req.body);
      return res.json(user);
    } catch (e: any) {
      if (!e.statusCode) {
        console.log(e);
      }

      return res.status(e.statusCode).json({ message: e.message });
    }
  }

  static async GetUser(req: Request, res: Response): Promise<Response> {
    const { idUser } = req;
    const usersServices = new UsersServices();
    const user = await usersServices.ById(idUser as string);
    if (!user) {
      res.status(400).json({ message: "user not exists" });
    }
    return res.json(user);
  }

  static async UpdateUser(req: Request, res: Response): Promise<Response> {
    try {
      const userService = new UsersServices();
      const { idUser } = req;
      const user = await userService.UpdateUser(idUser as string, req.body);
      return res.json(user);
    } catch (e) {
      return res.status(400).json({ message: (e as Error).message });
    }
  }

  static async DeleteUser(req: Request, res: Response): Promise<Response> {
    const { idUser } = req;
    const userService = new UsersServices();
    const messageDeleted = await userService.Delete(idUser as string);

    if (messageDeleted) {
      return res.json({ message: messageDeleted });
    }

    return res.status(404).json({ message: "user not exists" });
  }
  static sendTokenToEmail = async (req: Request, res: Response) => {
    try {
      const userService = new UsersServices();
      const email = await userService.sendTokenToEmail(req.body.email);
      return res.status(200).json({ message: email });
    } catch (e) {
      return res.status(400).json({ message: (e as Error).message });
    }
  };

  static resetPassword = async (req: Request, res: Response) => {
    try {
      const userService = new UsersServices();
      const { token, password } = req.body;
      const email = await userService.resetPassword(token, password);
      return res.status(200).json({ message: email });
    } catch (e) {
      return res.status(400).json({ message: (e as Error).message });
    }
  };
}
