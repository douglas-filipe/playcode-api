import { Router, Express } from "express";
import { VideoControllers } from "../controllers/video.controller";

const videoControllers = new VideoControllers();
const router = Router();

const watchRoute = (app: Express) => {
  router.get("/:id", videoControllers.FindOneById);
  router.get("/:id/view", videoControllers.increaseById);

  app.use("/watch", router);
};

export default watchRoute;
