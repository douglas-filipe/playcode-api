import { getCustomRepository } from "typeorm";
import { TagsRepository } from "../repositories";
import { ITags } from "../types";

export class TagsService {
    tagsRepository: TagsRepository

    constructor(){
        this.tagsRepository = getCustomRepository(TagsRepository)
    }

    async create(data: ITags){
        const tag = this.tagsRepository.create(data)
        await this.tagsRepository.save(tag)
        return tag
    }
    
}