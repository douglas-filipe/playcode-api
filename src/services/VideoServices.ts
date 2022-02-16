import { getCustomRepository } from "typeorm";
import { ResponseError } from "../errors";
import { VideoRepositories } from "../repositories";
import { IVideos } from "../types/IVideo";
import { uploadVideo } from "../utils/UploadVideoData";

export class VideoServices {
  videoRepository: VideoRepositories;

  constructor() {
    this.videoRepository = getCustomRepository(VideoRepositories);
  }
  async AddVideo(body: IVideos, img: any) {
    //FIXME error treatement when user post video and imgs

    const file = await uploadVideo(img[0].buffer, img[0]);
    const videoFiles = await uploadVideo(img[1].buffer, img[1]);

    const video = this.videoRepository.create({
      name: body.name,
      description: body.description,
      videourl: videoFiles.Location,
      videokey: videoFiles.Key,
      duration: body.duration,
      thumburl: file.Location,
      tumbkey: file.Key,
    });
    await this.videoRepository.save(video);
    return video;
  }

  async WatchVideo(id: any) {
    const video = this.videoRepository.findOne(id);

    let CurViews;
    await video.then((response) => (CurViews = response?.views));
    console.log(CurViews);
    await this.videoRepository.update(id, {
      views: Number(CurViews) + 1,
    });
    const watch = this.videoRepository.findOne(id);

    return watch;
  }
}
