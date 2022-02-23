import { FindOneOptions, getCustomRepository } from "typeorm";
import Comments from "../entities/comments.entity";
import { CommentsRepository } from "../repositories";
import { IComments } from "../types";

export class CommentsService {
  commentsRepository: CommentsRepository;

  constructor() {
    this.commentsRepository = getCustomRepository(CommentsRepository);
  }

  async create(data: IComments) {
    const comment = this.commentsRepository.create(data);
    await this.commentsRepository.save(comment);
    return {
      id: comment.id,
      description: comment.description,
    };
  }

  async byId(id: string, options?: FindOneOptions<Comments>) {
    const comment = await this.commentsRepository.findOne({ id }, options);

    return comment;
  }

  async delete(id: string) {
    const deleted = await this.commentsRepository.delete({ id });
    if (deleted.affected) {
      return true;
    }
    return false;
  }

  async ListComments() {
    try {
      const comments = await this.commentsRepository.find();

      return comments;
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }

  async UpdateCommentary(id: string, body: IComments) {
    try {
      await this.commentsRepository.update(id, {
        description: body.description,
      });

      const updatedCommentary = this.commentsRepository.findOne({ id });

      return updatedCommentary;
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }
}
