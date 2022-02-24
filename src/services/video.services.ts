import { FindOneOptions, getCustomRepository } from "typeorm";
import Video from "../entities/videos.entity";
import { ResponseError } from "../errors";
import {
  ChannelRepository,
  CommentsRepository,
  VideoRepositories,
} from "../repositories";
import { IVideos } from "../types/IVideo";
import { IVideoWithUser } from "../types/validationTypes";
import {
  deleteData,
  uploadImage,
  uploadVideo,
} from "../utils/VideoDataManager";

export class VideoServices {
  videoRepository: VideoRepositories;
  channelRepository: ChannelRepository;
  commentRepository: CommentsRepository;

  constructor() {
    this.videoRepository = getCustomRepository(VideoRepositories);
    this.channelRepository = getCustomRepository(ChannelRepository);
    this.commentRepository = getCustomRepository(CommentsRepository);
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

  async withUserIdById(id: string, options?: FindOneOptions<Video>) {
    let video: IVideoWithUser | undefined = await this.videoRepository.findOne(
      { id },
      options
    );

    if (video?.channel) {
      const channel = await this.channelRepository.findOne(
        { id: video.channel.id },
        { relations: ["user"] }
      );
      video.userId = channel?.user.id;
    }

    return video;
  }

  async WatchVideo(videoId: any) {
    try {
      const watch: any = await this.videoRepository.findOne({
        where: { id: videoId.id },
        relations: ["channel", "likesvideos"],
      });

      if (!watch) {
        throw new ResponseError("video not found", 404);
      }

      const comments = await this.commentRepository.find({
        relations: ["video", "user"],
      });

      const commentsFiltered = comments
        .filter((comment) => comment.video.id === watch.id)
        .map((item) => {
          return {
            id: item.id,
            description: item.description,
            likes: item.likes,
            user: { id: item.user.id, name: item.user.name },
          };
        });

      watch.comments = commentsFiltered;

      return watch;
    } catch (e) {
      throw new ResponseError("Video not found", 404);
    }
  }
  async incrementViews(videoId: string) {
    const video = await this.videoRepository.findOne(videoId);

    if (!video) {
      throw new ResponseError("Video not found", 404);
    }

    video.views += 1;

    await this.videoRepository.update(videoId, video);

    return "increased views";
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

    if (video === undefined) {
      throw new ResponseError("Video not found", 404);
    }

    const channel = await this.channelRepository.findOne({
      where: { id: video?.channel.id },
      relations: ["user"],
    });

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
