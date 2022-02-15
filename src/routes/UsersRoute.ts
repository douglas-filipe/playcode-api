import { Router } from "express";
import { UsersControllers } from "../controllers";
const usersControllers = new UsersControllers();

const router = Router();

router.post("/users", (req, res) => {
  usersControllers.CreateUser(req, res);
});

export default router;
