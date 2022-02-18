import { Request, Response } from "express";
import { ResponseError } from "../errors";
import { VideoServices } from "../services";

export class VideoControllers {
  async CreateVideo(req: Request, res: Response): Promise<Response> {
    try {
      const video = new VideoServices();

      const userFiles: any = req.files;

      let imgFile = userFiles.filter((e: any) => e.fieldname === "img")[0];
      let vidFile = userFiles.filter((e: any) => e.fieldname === "video")[0];

      if (imgFile === undefined) {
        throw new ResponseError(
          "Field 'img' is required, allowed extensions (png, jpg, jpeg)",
          403
        );
      }
      if (vidFile === undefined) {
        throw new ResponseError(
          "Field 'video' is required, allowed extensions (mp4, avi, wmv)",
          403
        );
      }

      const user = await video.AddVideo(req.body, imgFile, vidFile);

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
  async UpdateById(req: Request, res: Response): Promise<Response> {
    try {
      const video = new VideoServices();

      const updateData = await video.UpdateVideo(req.body, req.params);

      return res.status(200).json(updateData);
    } catch (error: any) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }
  async DeleteById(req: Request, res: Response): Promise<Response> {
    try {
      const video = new VideoServices();

      await video.DeleteVideo(req.params);

      return res.status(204);
    } catch (error: any) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }
}
