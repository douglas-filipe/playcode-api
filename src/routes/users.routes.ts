import { Router, Express } from "express";
import { UsersControllers } from "../controllers";
import { validation, verifyToken } from "../middlewares";
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
  router.get("/users", verifyToken, UsersControllers.GetUser);
  router.delete("/users", verifyToken, UsersControllers.DeleteUser);
  router.patch(
    "/users",
    verifyToken,
    DuplicateEmail,
    UsersControllers.UpdateUser
  );
  router.post("/users/recover_password", UsersControllers.sendTokenToEmail);
  router.patch("/users/change_password", UsersControllers.resetPassword);
  app.use("/", router);
};

export default usersRoute;
