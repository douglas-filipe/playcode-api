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
    
    static async delete(req: Request, res: Response){
        const tagService = new TagsService()
        const { id } = req.params
        const deleted = await tagService.delete(id)
        
        if(!deleted){
            return res.status(404).json({message: "tag not found"})
        }
        
        return res.json({message: "tag deleted!"})
    }
    
    static async list(req: Request, res: Response){
        const tagService = new TagsService()
        const tags = await tagService.list()
        return res.json(tags)
    }
}