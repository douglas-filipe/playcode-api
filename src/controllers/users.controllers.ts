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
    io.emit("Teste", "Teste");
    try {
      const token = await userService.Authenticate(req.body);
      return res.json({ token: token });
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
    const user = await usersServices.ById(idUser);
    return res.json(user);
  }
}
