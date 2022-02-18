import { Request, Response } from "express";
import { LikesVideosService } from "../services/likesvideos.service";

export class LikesVideosControllers {
  static async LikeVideo(req: Request, res: Response): Promise<Response> {
    try {
      const { idUser } = req;
      const likesVideosServices = new LikesVideosService();
      const like = await likesVideosServices.LikeVideo(
        idUser as string,
        req.params.id
      );
      return res.status(200).json({ message: like });
    } catch (e) {
      return res.status(400).json({ message: (e as Error).message });
    }
  }
}
