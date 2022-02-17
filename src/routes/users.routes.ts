import { Router, Express } from "express";
import { UsersControllers } from "../controllers";
import { validation } from "../middlewares";
import { DuplicateEmail } from "../middlewares/user.middleware";
import { createUserModel, loginUserModel } from "../models";

const router = Router();

const usersRoute = (app: Express) => {
  router.post(
    "/users",
    DuplicateEmail,
    validation(createUserModel),
    UsersControllers.CreateUser
  );
  router.post("/login", validation(loginUserModel), UsersControllers.LoginUser);
  app.use("/", router);
};

export default usersRoute;
