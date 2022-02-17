import { Router, Express } from "express";
import { VideoControllers } from "../controllers/VideoController";
import { videoValidation } from "../middlewares/video.middleware";
import { VideoModel } from "../models/videoModel.validation";
import multer from "multer";

const videoControllers = new VideoControllers();
const multerConfig = require("../configs/multer");

const router = Router();

const videosRoute = (app: Express) => {
  router.post(
    "",
    multer(multerConfig).any(),
    videoValidation(VideoModel),
    videoControllers.CreateVideo
  );
  router.put("/:id", videoValidation(VideoModel), videoControllers.UpdateById);
  app.use("/videos", router);
};

export default videosRoute;
