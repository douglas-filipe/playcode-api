import { getCustomRepository } from "typeorm";
import { UsersRepositories, VideoRepositories } from "../repositories";
import { LikesVideosRepository } from "../repositories/likesvideos.repotitory";

interface ILikesVideosRequestBody {
  user_id: string;
  video_id: string;
}

export class LikesVideosService {
  likesvideosRepository: LikesVideosRepository;
  usersRepository: UsersRepositories;
  videoRepository: VideoRepositories;

  constructor() {
    this.likesvideosRepository = getCustomRepository(LikesVideosRepository);
    this.usersRepository = getCustomRepository(UsersRepositories);
    this.videoRepository = getCustomRepository(VideoRepositories);
  }
  async LikeVideo(user_id: string, video_id: string) {
    try {
      const video = await this.videoRepository.findOne({ id: video_id });
      if (!video) throw new Error("Video not found");
      const like = await this.likesvideosRepository.findOne({
        user_id,
        video_id,
      });

      if (!like) {
        const newLike = this.likesvideosRepository.create({
          user_id,
          video_id,
        });
        video.likes += 1;
        await this.videoRepository.save(video);
        await this.likesvideosRepository.save(newLike);
        return `Add reaction to in video_id: ${newLike.video_id}, from user_id ${newLike.user_id}`;
      }
      video.likes -= 1;
      await this.videoRepository.save(video);
      await this.likesvideosRepository.delete(like);
      return `Remove reaction to in video_id: ${like.video_id}, from user_id ${like.user_id}`;
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }
}
