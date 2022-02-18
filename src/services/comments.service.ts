import { getCustomRepository } from "typeorm";
import { CommentsRepository } from "../repositories";
import { IComments } from "../types";

export class CommentsService {

    commentsRepository: CommentsRepository

    constructor () {
        this.commentsRepository = getCustomRepository(CommentsRepository)
    }

    async create(data: IComments){
        const comment = this.commentsRepository.create(data)     
        await this.commentsRepository.save(comment)
        return{
            id: comment.id,
            description: comment.description
        }
    }
}