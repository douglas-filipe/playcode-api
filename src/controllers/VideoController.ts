import { Request, Response } from "express";
import { ResponseError } from "../errors";
import { VideoServices } from "../services";

export class VideoControllers {
  async CreateVideo(req: Request, res: Response): Promise<Response> {
    const video = new VideoServices();

    const userFiles = req.files;
    const user = await video.AddVideo(req.body, userFiles);

    return res.status(201).json(user);
  }
  async FindOneById(req: Request, res: Response): Promise<Response> {
    try {
      const video = new VideoServices();

      const watchOne = await video.WatchVideo(req.params);
      return res.status(200).json(watchOne);
    } catch (err: any) {
      return res.status(404).json({ error: "Video not found" });
    }
  }
}
