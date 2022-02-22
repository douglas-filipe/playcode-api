import { Router, Express } from "express";
import multer from "multer";
import { ChannelController } from "../controllers";
import { chanelNotExist, verifyError, verifyToken } from "../middlewares";
const multerConfig = require("../configs/multer");

const router = Router();

const channelRouter = (app: Express) => {
  router.post(
    "",
    verifyToken,
    multer(multerConfig).any(),
    ChannelController.create
  );
  router.get("", ChannelController.all);
  router.get("/:id", chanelNotExist, verifyError, ChannelController.byId);
  router.patch(
    "/:id",
    verifyToken,
    multer(multerConfig).any(),
    chanelNotExist,
    verifyError,
    ChannelController.update
  );
  router.delete(
    "/:id",
    verifyToken,
    chanelNotExist,
    verifyError,
    ChannelController.delete
  );

  app.use("/channel", router);
};

export default channelRouter;
