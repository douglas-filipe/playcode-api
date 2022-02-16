import { Request, Response } from "express";
import { ResponseError } from "../errors";
import { UsersServices } from "../services";

export class UsersControllers {
  
  async CreateUser(req: Request, res: Response): Promise<Response> {
    const usersServices = new UsersServices();
    const user = await usersServices.CreateUser(req.body);
    return res.status(201).json(user);
  }


  async LoginUser (req: Request, res: Response,): Promise<Response> {
    
    const userService = new UsersServices()
    
    try{
      const token = await userService.Authenticate(req.body)
      return res.json({token: token})
    
    }catch(e: ResponseError | any){
      return res.status(e.statusCode).json({message: e.message})
    }


  }
}
