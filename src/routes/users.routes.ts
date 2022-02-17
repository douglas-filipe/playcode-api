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
<<<<<<< HEAD
  router.get("/users", verifyToken, UsersControllers.GetUser)
  router.delete("/users", verifyToken, UsersControllers.DeleteUser)
=======
  router.get("/users", verifyToken, UsersControllers.GetUser);
  router.put(
    "/users",
    verifyToken,
    DuplicateEmail,
    UsersControllers.UpdateUser
  );
>>>>>>> 43e636b18c14e8af3e827b8fe3a9839087cc4de9
  app.use("/", router);
};

export default usersRoute;
