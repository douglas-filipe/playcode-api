import { Router, Express } from "express";
import { VideoControllers } from "../controllers/video.controller";
import { validation } from "../middlewares/validation.middleware";
import { VideoModel } from "../models/videoModel.validation";
import multer from "multer";
import { verifyError, verifyOwner, verifyToken } from "../middlewares";
import { LikesVideosControllers } from "../controllers/likesvideos.controllers";
import { VideoServices } from "../services";

const videoControllers = new VideoControllers();
const multerConfig = require("../configs/multer");

const router = Router();

const videosRoute = (app: Express) => {
  router.post(
    "",
    verifyToken,
    multer(multerConfig).any(),
    validation(VideoModel),
    videoControllers.CreateVideo
  );
  router.patch(
    "/:id",
    verifyToken,
    verifyOwner("video"),
    validation(VideoModel),
    verifyError,
    videoControllers.UpdateById
  );
  router.delete(
    "/:id",
    verifyToken,
    verifyOwner("video"),
    verifyError,
    videoControllers.DeleteById
  );
  router.post("/:id/like", verifyToken, LikesVideosControllers.LikeVideo);
  router.get("/populate", videoControllers.ListAllVideosPopulate);
  router.get("/recents", videoControllers.ListAllVideosRecents);
  router.get("/limit/recents", videoControllers.ListLimitVideosRecents);
  router.get("/limit/populate", videoControllers.ListLimitVideosPopulate);
  app.use("/videos", router);
};

export default videosRoute;
