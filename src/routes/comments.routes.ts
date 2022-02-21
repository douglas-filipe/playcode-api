import { Express, Router } from "express";
import { CommentsController } from "../controllers";
import { createCommentsModel } from "../models";
import { validation, verifyToken } from "../middlewares";
const router = Router();

const commentsRouter = (app: Express) => {
  router.post(
    "",
    verifyToken,
    validation(createCommentsModel),
    CommentsController.create
  );
  router.delete("/:id", CommentsController.delete)
  app.use("/comments", router);
};

export default commentsRouter;
