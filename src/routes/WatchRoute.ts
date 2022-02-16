import { Router, Express } from "express";
import { VideoControllers } from "../controllers/VideoController";
import { Resolver } from "../middlewares/Error.resolver";

const videoControllers = new VideoControllers();
const router = Router();

const watchRoute = (app: Express) => {
  router.get("/:id", Resolver(videoControllers.FindOneById));
  app.use("/watch", router);
};

export default watchRoute;
