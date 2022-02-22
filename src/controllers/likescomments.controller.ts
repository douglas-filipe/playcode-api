import { Request, Response } from "express";
import { LikesCommentsService } from "../services/likescomments.service";

export class LikeCommentsControllers {
  static async LikeCommentary(req: Request, res: Response) {
    try {
      const { idUser } = req;
      const likesCommentsService = new LikesCommentsService();
      const like = await likesCommentsService.LikeCommentary(
        idUser as string,
        req.params.id
      );

      return res.status(200).json({ message: like });
    } catch (e) {
      res.status(400).json({ message: (e as Error).message });
    }
  }
}
