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
  async AddVideo(body: IVideos, imgFile: any, vidFile: any) {
    if (
      (imgFile.mimetype === "image/png" ||
        imgFile.mimetype === "image/jpg" ||
        imgFile.mimetype === "image/jpeg") &&
      imgFile.size > 2 * 1024 * 1024
    ) {
      throw new ResponseError("Image file cannot exceed 2MB", 400);
    }

    const file = await uploadVideo(imgFile.buffer, imgFile);
    const videoFiles = await uploadVideo(vidFile.buffer, vidFile);

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
    try {
      const video = this.videoRepository.findOne(id);

      let CurViews;
      await video.then((response) => (CurViews = response?.views));
      await this.videoRepository.update(id, {
        views: Number(CurViews) + 1,
      });

      const watch = this.videoRepository.findOne(id);

      return watch;
    } catch (e) {
      throw new ResponseError("Video not found", 404);
    }
  }
  async UpdateVideo(body: IVideos, id: any) {
    try {
      await this.videoRepository.update(id, {
        name: body.name,
        description: body.description,
        duration: body.duration,
      });

      const updated = this.videoRepository.findOne(id);
      return updated;
    } catch (e) {
      throw new ResponseError("Video not found", 404);
    }
  }
}
