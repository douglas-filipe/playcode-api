import { Router, Express } from "express";
import { VideoControllers } from "../controllers/VideoController";
import { videoValidation } from "../middlewares/video.middleware";
import { createVideoModel } from "../models/videoModel.validation";
import multer from "multer";
import { Resolver } from "../middlewares/Error.resolver";

const videoControllers = new VideoControllers();
const multerConfig = require("../configs/multer");

const router = Router();

const videosRoute = (app: Express) => {
  router.post(
    "/",
    multer(multerConfig).any(),
    videoValidation(createVideoModel),
    Resolver(videoControllers.CreateVideo)
  );
  app.use("/videos", router);
};

export default videosRoute;
