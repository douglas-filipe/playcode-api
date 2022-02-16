import { Router, Express } from "express";
import { ChannelController } from "../controllers";
import { chanelNotExist } from "../middlewares";

const router = Router();

const channelRouter = (app: Express) => {
  router.post("", ChannelController.create);
  router.get("/:id", chanelNotExist) // está apenas com o middleware
  app.use("/channel", router);
};

export default channelRouter;
