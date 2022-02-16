import { getCustomRepository } from "typeorm";
import { VideoRepositories } from "../repositories";
import { IVideos } from "../types/IVideo";

export class VideoServices {
  async AddVideo(body: IVideos) {
    const videoRepository = getCustomRepository(VideoRepositories);

    const video = videoRepository.create({
      ...body,
    });
    await videoRepository.save(video);
    return video;
  }
}
