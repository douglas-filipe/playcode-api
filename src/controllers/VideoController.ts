import { Request, Response } from "express";
import { VideoServices } from "../services";

export class VideoControllers {
  async CreateVideo(req: Request, res: Response): Promise<Response> {
    try {
      const video = new VideoServices();
      const userFiles = req.files;
      const user = await video.AddVideo(req.body, userFiles);
      return res.status(201).json(user);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
