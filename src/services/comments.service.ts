import { FindOneOptions, getCustomRepository } from "typeorm";
import Comments from "../entities/comments.entity";
import { ResponseError } from "../errors";
import {
  CommentsRepository,
  UsersRepositories,
  VideoRepositories,
} from "../repositories";
import { IComments } from "../types";

export class CommentsService {
  commentsRepository: CommentsRepository;
  userRepository: UsersRepositories;
  videoRepository: VideoRepositories;

  constructor() {
    this.commentsRepository = getCustomRepository(CommentsRepository);
    this.userRepository = getCustomRepository(UsersRepositories);
    this.videoRepository = getCustomRepository(VideoRepositories);
  }

  async create(description: string, userId: string, videoId: string) {
    const _user = await this.userRepository.findOne({ id: userId });
    if (!_user) {
      throw new ResponseError("User not found", 404);
    }

    const _video = await this.videoRepository.findOne({ id: videoId });
    if (!_video) {
      throw new ResponseError("Video not found", 404);
    }

    const comment = this.commentsRepository.create({ description });
    comment.user = _user;
    comment.video = _video;

    await this.commentsRepository.save(comment);

    const { user, video, ...onlyComment } = comment;

    return {
      ...onlyComment,
      user: { id: user.id, name: user.name },
      video: { id: video.id, name: video.name },
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
