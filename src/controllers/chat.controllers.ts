import { Request, Response } from "express";
import { ChatServices } from "../services/chat.service";

export class ChatControllers {
  static async CreateRoom(req: Request, res: Response): Promise<Response> {
    try {
      const chatService = new ChatServices();
      const room = await chatService.CreateRoom(req.body);
      return res.status(201).json(room);
    } catch (e) {
      return res.status(400).json({ message: "Error create room" });
    }
  }

  static async CreateMessage(req: Request, res: Response): Promise<Response> {
    try {
      const chatService = new ChatServices();
      const message = await chatService.CreateMessage(req.body);
      return res.status(201).json(message);
    } catch (e) {
      return res.status(400).json({ message: "Error" });
    }
  }

  static async ListMessagesRoom(
    req: Request,
    res: Response
  ): Promise<Response> {
    const chatService = new ChatServices();
    const messages = await chatService.ListMessagesRoom(req.params.room_id);
    return res.json(messages);
  }
}
