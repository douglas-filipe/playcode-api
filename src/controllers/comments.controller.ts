import { Request, Response } from "express";
import { CommentsService } from "../services";

export class CommentsController { 

    static async create(req: Request, res: Response){

        const commentService = new CommentsService()
        const comment = await commentService.create({...req.body, user: {id: req.idUser}})
        return res.status(201).json(comment)
    }

}