import { Express, Router } from "express";
import { ChatControllers } from "../controllers/chat.controllers";
const router = Router();

const chatRouter = (app: Express) => {
  router.post("/room", ChatControllers.CreateRoom);
  router.post("/message", ChatControllers.CreateMessage);
  router.get("/messages/:room_id", ChatControllers.ListMessagesRoom);
  app.use("/", router);
};

export default chatRouter;
