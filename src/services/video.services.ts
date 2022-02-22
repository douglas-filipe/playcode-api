import { getCustomRepository } from "typeorm";
import { ResponseError } from "../errors";
import { ChannelRepository, VideoRepositories } from "../repositories";
import { IVideos } from "../types/IVideo";
import {
  deleteData,
  uploadImage,
  uploadVideo,
} from "../utils/VideoDataManager";

export class VideoServices {
  videoRepository: VideoRepositories;
  channelRepository: ChannelRepository;

  constructor() {
    this.videoRepository = getCustomRepository(VideoRepositories);
    this.channelRepository = getCustomRepository(ChannelRepository);
  }
  async AddVideo(
    body: IVideos,
    userFiles: any,
    userId: { id: string } | undefined
  ) {
    const userChannel = await this.channelRepository.findOne({ user: userId });

    if (userChannel === undefined) {
      throw new ResponseError("User doesn't have a channel", 404);
    }

    const { imgFile, vidFile } = userFiles.reduce((acc: any, cur: any) => {
      if (cur.fieldname === "img") {
        return { ...acc, imgFile: cur };
      }

      if (cur.fieldname === "video") {
        return { ...acc, vidFile: cur };
      }
    }, {});

    const vidExtension = ["mp4", "avi", "wmv"];
    const imgExtension = ["jpg", "jpeg", "png"];

    if (imgFile.size > 2 * 1024 * 1024) {
      throw new ResponseError("Image file cannot exceed 2MB", 400);
    }
    if (
      !imgFile ||
      !imgExtension.includes(imgFile.mimetype.split("/")[1]) ||
      imgFile.mimetype.split("/")[0] !== "image"
    ) {
      throw new ResponseError(
        "Field 'img' is required, allowed extensions (png, jpg, jpeg)",
        403
      );
    }

    if (
      !vidFile ||
      !vidExtension.includes(vidFile.mimetype.split("/")[1]) ||
      vidFile.mimetype.split("/")[0] !== "video"
    ) {
      throw new ResponseError(
        "Field 'video' is required, allowed extensions (mp4, avi, wmv)",
        403
      );
    }

    const file = await uploadImage(imgFile.buffer, imgFile);
    const videoFiles = await uploadVideo(vidFile.buffer, vidFile);

    const video = this.videoRepository.create({
      name: body.name,
      description: body.description,
      videourl: videoFiles.Location,
      videokey: videoFiles.Key,
      duration: body.duration,
      thumburl: file.Location,
      tumbkey: file.Key,
      channel: userChannel,
    });

    await this.videoRepository.save(video);

    return video;
  }

  async WatchVideo(videoId: any) {
    try {
      const video = this.videoRepository.findOne(videoId);

      let CurViews;
      await video.then((response) => (CurViews = response?.views));
      await this.videoRepository.update(videoId, {
        views: Number(CurViews) + 1,
      });

      const watch = this.videoRepository.findOne({
        where: { id: videoId.id },
        relations: ["channel", "likesvideos", "comments"],
      });

      return watch;
    } catch (e) {
      throw new ResponseError("Video not found", 404);
    }
  }
  async UpdateVideo(body: IVideos, videoId: string, userId: any) {
    const video = await this.videoRepository.findOne({
      where: { id: videoId },
      relations: ["channel"],
    });
    const channel = await this.channelRepository.findOne({
      where: { id: video?.channel.id },
      relations: ["user"],
    });

    if (video === undefined) {
      throw new ResponseError("Video not found", 404);
    }

    if (channel?.user.id !== userId.id) {
      throw new ResponseError(
        "Forbiden only channel owner can update video",
        401
      );
    }

    await this.videoRepository.update(videoId, {
      name: body.name,
      description: body.description,
      duration: body.duration,
      updatedOn: new Date(),
    });

    const updated = this.videoRepository.findOne(videoId);
    return updated;
  }
  async DeleteVideo(videoId: string, userId: any) {
    const video = await this.videoRepository.findOne({
      where: { id: videoId },
      relations: ["channel"],
    });
    const channel = await this.channelRepository.findOne({
      where: { id: video?.channel.id },
      relations: ["user"],
    });

    if (video === undefined) {
      throw new ResponseError("Video not found", 404);
    }

    if (channel?.user.id !== userId.id) {
      throw new ResponseError(
        "Forbiden only channel owner can delete video",
        401
      );
    }

    deleteData(video?.tumbkey);
    deleteData(video?.videokey);
    await this.videoRepository.delete(video.id);

    return { message: "Video deleted" };
  }

  async ListAllVideosRecents() {
    const videos = await this.videoRepository
      .createQueryBuilder("videos")
      .leftJoinAndSelect("videos.likesvideos", "likesvideos")
      .leftJoinAndSelect("videos.channel", "channel")
      .orderBy("videos.createdOn", "DESC")
      .getMany();
    return videos;
  }
  async ListAllVideosPopulate() {
    const videos = await this.videoRepository
      .createQueryBuilder("videos")
      .leftJoinAndSelect("videos.likesvideos", "likesvideos")
      .leftJoinAndSelect("videos.channel", "channel")
      .orderBy("videos.views", "DESC")
      .orderBy("videos.likes", "DESC")
      .getMany();
    return videos;
  }

  async ListLimitVideosPopulate() {
    const videos = await this.videoRepository
      .createQueryBuilder("videos")
      .leftJoinAndSelect("videos.likesvideos", "likesvideos")
      .leftJoinAndSelect("videos.channel", "channel")
      .limit(6)
      .orderBy("videos.views", "DESC")
      .orderBy("videos.likes", "DESC")
      .getMany();
    return videos;
  }

  async ListLimitVideosRecents() {
    const videos = await this.videoRepository
      .createQueryBuilder("videos")
      .leftJoinAndSelect("videos.likesvideos", "likesvideos")
      .leftJoinAndSelect("videos.channel", "channel")
      .limit(6)
      .orderBy("videos.createdOn", "DESC")
      .getMany();
    return videos;
  }
}
