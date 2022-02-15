import { Router, Express } from "express";
import { UsersControllers } from "../controllers";
import { CreateUser } from "../controllers/UsersControllers";
const usersControllers = new UsersControllers();

const router = Router();

const usersRoute = (app: Express) => {
  router.post("", usersControllers.CreateUser);
  app.use("/users", router);
};

export default usersRoute;
