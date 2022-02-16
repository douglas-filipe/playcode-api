import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ResponseError } from "../errors";
import { ChannelRepository,  } from '../repositories'

export const chanelNotExist = async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params
    
    try{
        const channel  = await getCustomRepository(ChannelRepository).findOne({ id: id})
        next()
    }catch(e){
        throw new ResponseError('channel not found', 404)
        return next()
    }
}