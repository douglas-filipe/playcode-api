import { getCustomRepository } from "typeorm";
import { ResponseError } from "../errors";
import { VideoRepositories } from "../repositories";
import { IVideos } from "../types/IVideo";
import { uploadVideo } from "../utils/UploadVideoData";

export class VideoServices {
  async AddVideo(body: IVideos, img: any) {
    const videoRepository = getCustomRepository(VideoRepositories);

    const file = await uploadVideo(img[0].buffer, img[0]);
    const videoFiles = await uploadVideo(img[1].buffer, img[1]);

    const video = videoRepository.create({
      name: body.name,
      description: body.description,
      videourl: videoFiles.Location,
      videokey: videoFiles.Key,
      duration: body.duration,
      thumburl: file.Location,
      tumbkey: file.Key,
    });
    await videoRepository.save(video);
    return video;
  }
}
