import { Router, Express } from "express";
import { VideoControllers } from "../controllers/VideoController";
import { videoValidation } from "../middlewares/video.middleware";
import { createVideoModel } from "../models/videoModel.validation";
const videoControllers = new VideoControllers();

const router = Router();

const videosRoute = (app: Express) => {
  router.post(
    "/",
    videoValidation(createVideoModel),
    videoControllers.CreateVideo
  );
  app.use("/videos", router);
};

export default videosRoute;
