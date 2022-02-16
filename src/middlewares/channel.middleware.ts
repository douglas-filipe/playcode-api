import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../errors";
import { ChannelService } from "../services";

export const chanelNotExist = async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params 
    
    try{
        const channelService = new ChannelService(); 
        const channel = await channelService.byId(id)
        let err: ResponseError | undefined ;
        
        if(!channel){
            err = new ResponseError('channel not found', 404)
        }
        
        next(err)
    }catch(e: any){

        return res.status(404).json({message: "channel not found"})
    }
}
