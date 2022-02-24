import { Request, Response } from "express";
import { ResponseError } from "../errors";
import { VideoServices } from "../services";

export class VideoControllers {
  async CreateVideo(req: Request, res: Response): Promise<Response> {
    try {
      const video = new VideoServices();

      const user = await video.AddVideo(req.body, req.files, req.user);

      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }
  async FindOneById(req: Request, res: Response): Promise<Response> {
    try {
      const video = new VideoServices();

      const watchOne = await video.WatchVideo(req.params);
      return res.status(200).json(watchOne);
    } catch (error: any) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }
  async increaseById(req: Request, res: Response) {
    try {
      const video = new VideoServices();

      const view = await video.incrementViews(req.params.id);

      return res.json({ message: view });
    } catch (e: any) {
      if (e.statusCode) {
        return res.status(e.statusCode).json({ message: e.message });
      }
      return res.status(400).json(e.message);
    }
  }
  async UpdateById(req: Request, res: Response): Promise<Response> {
    try {
      const video = new VideoServices();

      const updateData = await video.UpdateVideo(
        req.body,
        req.params.id,
        req.user
      );

      return res.status(200).json(updateData);
    } catch (error: any) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }
  async DeleteById(req: Request, res: Response): Promise<Response> {
    try {
      const video = new VideoServices();

      const deleted = await video.DeleteVideo(req.params.id, req.user);

      return res.status(200).json(deleted);
    } catch (error: any) {
      if (!error.statusCode) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(error.statusCode).json({ error: error.message });
    }
  }
  async ListAllVideosRecents(req: Request, res: Response): Promise<Response> {
    const videosServices = new VideoServices();
    const videos = await videosServices.ListAllVideosRecents();
    return res.json(videos);
  }

  async ListAllVideosPopulate(req: Request, res: Response): Promise<Response> {
    const videosServices = new VideoServices();
    const videos = await videosServices.ListAllVideosPopulate();
    return res.json(videos);
  }

  async ListLimitVideosPopulate(
    req: Request,
    res: Response
  ): Promise<Response> {
    const videosServices = new VideoServices();
    const videos = await videosServices.ListLimitVideosPopulate();
    return res.json(videos);
  }

  async ListLimitVideosRecents(req: Request, res: Response): Promise<Response> {
    const videosServices = new VideoServices();
    const videos = await videosServices.ListLimitVideosRecents();
    return res.json(videos);
  }
}
