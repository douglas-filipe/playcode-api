import { Express, Router } from "express";
import { CommentsController } from "../controllers";
import { createCommentsModel, updateCommetsModel } from "../models";
import {
  validation,
  verifyError,
  verifyOwner,
  verifyToken,
} from "../middlewares";
import { LikeCommentsControllers } from "../controllers/likescomments.controller";
import { CommentsService } from "../services";
const router = Router();

const commentsRouter = (app: Express) => {
  router.post(
    "",
    verifyToken,
    validation(createCommentsModel),
    CommentsController.create
  );
  router.delete(
    "/:id",
    verifyToken,
    verifyOwner("comment"),
    verifyError,
    CommentsController.delete
  );
  router.get("/", CommentsController.ListComments);
  router.put(
    "/:id",
    verifyToken,
    verifyOwner("comment"),
    verifyError,
    CommentsController.UpdateCommentary
  );
  router.post("/like/:id", verifyToken, LikeCommentsControllers.LikeCommentary);

  app.use("/comments", router);
};

export default commentsRouter;
