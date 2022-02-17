import { Router, Express } from "express";
import { UsersControllers } from "../controllers";
import { validation, verifyError, verifyToken } from "../middlewares";
import { createUserModel, loginUserModel } from "../models";

const router = Router();

const usersRoute = (app: Express) => {
  router.post(
    "/users",
    validation(createUserModel),
    UsersControllers.CreateUser
  );
  router.post("/login", validation(loginUserModel), UsersControllers.LoginUser);
  router.get("/users", verifyToken, UsersControllers.GetUser)
  app.use("/", router);
};


export default usersRoute;
