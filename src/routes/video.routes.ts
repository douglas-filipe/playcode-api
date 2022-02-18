import { Router, Express } from "express";
import { VideoControllers } from "../controllers/video.controller";
import { validation } from "../middlewares/validation.middleware";
import { VideoModel } from "../models/videoModel.validation";
import multer from "multer";

const videoControllers = new VideoControllers();
const multerConfig = require("../configs/multer");

const router = Router();

const videosRoute = (app: Express) => {
  router.post(
    "",
    multer(multerConfig).any(),
    validation(VideoModel),
    videoControllers.CreateVideo
  );
  router.put("/:id", validation(VideoModel), videoControllers.UpdateById);
  router.delete("/:id", videoControllers.DeleteById);

  app.use("/videos", router);
};

export default videosRoute;
