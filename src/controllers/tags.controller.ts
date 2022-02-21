import { Request, Response } from "express";
import { TagsService } from "../services";

export class TagsController{
    
    static async create(req: Request, res: Response) {
        
        const tagService = new TagsService()
        
        const { name } = req.body
        if(!name){
            return res.status(401).json({message: `missing field name`})
        }

        const tag = await tagService.create({name})
        return res.status(201).json(tag)
    }
}