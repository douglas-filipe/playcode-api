import { Request, Response } from "express";
import { VideoServices } from "../services";

export class VideoControllers {
  async CreateVideo(req: Request, res: Response): Promise<Response> {
    const video = new VideoServices();

    const user = await video.AddVideo(req.body);
    return res.status(201).json(user);
  }
}
