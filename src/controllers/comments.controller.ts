import { json, Request, Response } from "express";
import { ResponseError } from "../errors";
import { CommentsService } from "../services";

export class CommentsController {
  static async create(req: Request, res: Response) {
    try {
      const commentService = new CommentsService();
      const { videoId, description } = req.body;
      const id = req.user?.id;

      const comment = await commentService.create(
        description,
        id as string,
        videoId
      );

      return res.status(201).json(comment);
    } catch (e: any) {
      if (e.statusCode) {
        return res.status(e.statusCode).json({ message: e.message });
      }

      return res.status(400).json({ messgae: e.message });
    }
  }

  static async delete(req: Request, res: Response) {
    const commentService = new CommentsService();
    const { id } = req.params;
    const deleted = await commentService.delete(id);
    if (!deleted) {
      return res.status(404).json({ message: "comment not found" });
    }
    return res.status(200).json({ message: "comment deleted" });
  }

  static async ListComments(req: Request, res: Response) {
    const commentService = new CommentsService();

    const getComments = await commentService.ListComments();

    return res.status(200).json(getComments);
  }

  static async UpdateCommentary(req: Request, res: Response) {
    try {
      const commentService = new CommentsService();
      const { id } = req.params;

      const updatedComment = await commentService.UpdateCommentary(
        id,
        req.body
      );

      if (!updatedComment) {
        throw new ResponseError("Comment not found", 404);
      }

      return res.status(200).json(updatedComment);
    } catch (e: any) {
      if (e.statusCode) {
        return res.status(e.statusCode).json({ message: e.message });
      }

      return res.status(400).json({ message: e.message });
    }
  }
}
