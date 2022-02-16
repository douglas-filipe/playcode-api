import { Router, Express } from "express";
import { ChannelController } from "../controllers";

const router = Router();

const channelRouter = (app: Express) => {
  router.post("", ChannelController.create);

  app.use("/channel", router);
};

export default channelRouter;
