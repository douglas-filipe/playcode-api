import { Express, Router } from "express";
import { CommentsController } from "../controllers";
import { createCommentsModel } from "../models";
import { validation, verifyToken } from "../middlewares";
import { LikeCommentsControllers } from "../controllers/likescomments.controller";
const router = Router();

const commentsRouter = (app: Express) => {
  router.post(
    "",
    verifyToken,
    validation(createCommentsModel),
    CommentsController.create
  );
  router.delete("/:id",verifyToken, CommentsController.delete);
  router.get("/", CommentsController.ListComments);
  router.put("/:id", verifyToken ,CommentsController.UpdateCommentary);
  router.post("/like/:id", verifyToken, LikeCommentsControllers.LikeCommentary);
  app.use("/comments", router);
};

export default commentsRouter;
