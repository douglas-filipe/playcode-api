import { Router, Express } from "express";
import { UsersControllers } from "../controllers";
import { validation, validationUser } from "../middlewares";
import { createUserModel, loginUserModel } from "../models";
const usersControllers = new UsersControllers();

const router = Router();

const usersRoute = (app: Express) => {
  router.post("/", validation(createUserModel), usersControllers.CreateUser);
  router.post("/login",validationUser(loginUserModel),usersControllers.LoginUser)
  app.use("/users", router);
};

export default usersRoute;
