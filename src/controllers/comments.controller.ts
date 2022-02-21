import { json, Request, Response } from "express";
import { CommentsService } from "../services";

export class CommentsController {
  static async create(req: Request, res: Response) {
    const commentService = new CommentsService();
    const comment = await commentService.create({
      ...req.body,
      user: { id: req.idUser },
    });
    return res.status(201).json(comment);
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
      return res.status(200).json(updatedComment);
    } catch (e) {
      return res.status(404).json({ message: "Comment not found" });
    }
  }
}
