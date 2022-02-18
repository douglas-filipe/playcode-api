import { Router, Express } from "express";
import multer from "multer";
import { ChannelController } from "../controllers";
import { chanelNotExist, verifyError } from "../middlewares";
const multerConfig = require("../configs/multer");

const router = Router();

const channelRouter = (app: Express) => {
  router.post("", multer(multerConfig).any(), ChannelController.create);
  router.get("/:id", chanelNotExist, verifyError, ChannelController.byId);
  router.delete("/:id", chanelNotExist, verifyError, ChannelController.delete);

  app.use("/channel", router);
};

export default channelRouter;
