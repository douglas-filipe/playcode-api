import { getCustomRepository } from "typeorm";
import { UsersRepositories, CommentsRepository } from "../repositories";
import { LikesCommentsRepository } from "../repositories/likescomments.repository";

interface ILikeCommentsRequestBody {
  user_id: string;
  comment_id: string;
}

export class LikesCommentsService {
  likesCommentsRepository: LikesCommentsRepository;
  usersRepository: UsersRepositories;
  commentsRepository: CommentsRepository;

  constructor() {
    this.likesCommentsRepository = getCustomRepository(LikesCommentsRepository);
    this.usersRepository = getCustomRepository(UsersRepositories);
    this.commentsRepository = getCustomRepository(CommentsRepository);
  }

  async LikeCommentary(user_id: string, comment_id: string) {
    try {
      const commentary = await this.commentsRepository.findOne({
        id: comment_id,
      });
      if (!commentary) throw new Error("Commentary not found");

      const like = await this.likesCommentsRepository.findOne({
        user_id,
        comment_id,
      });

      if (!like) {
        const newLike = this.likesCommentsRepository.create({
          user_id,
          comment_id,
        });
        commentary.likes += 1;
        await this.commentsRepository.save(commentary);
        await this.likesCommentsRepository.save(newLike);
        return `Add reaction to in video_id: ${newLike?.comment_id}, from user_id ${newLike.user_id}`;
      }
      commentary.likes -= 1;
      await this.commentsRepository.save(commentary);
      await this.likesCommentsRepository.delete(like.id);
      return `Remove reaction`;

      //throw new Error(`Have you already liked this`);
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }
}
