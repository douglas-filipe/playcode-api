import { Router, Express } from "express";
import { UsersControllers } from "../controllers";
import { validation } from "../middlewares";
import { createUserModel } from "../models";

const router = Router();

const usersRoute = (app: Express) => {
  router.post("/", validation(createUserModel), UsersControllers.CreateUser);
  app.use("/users", router);
};

export default usersRoute;
