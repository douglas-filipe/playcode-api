import { FindManyOptions, FindOneOptions, getCustomRepository } from "typeorm";
import { VideoServices } from "./video.services";
import Channel from "../entities/channel.entity";
import { ResponseError } from "../errors";
import { ChannelRepository } from "../repositories";
import { IChannelWithoutUserPassword } from "../types/IChannel";
import { deleteData, uploadImage } from "../utils/VideoDataManager";

export class ChannelService {
  channelRepository: ChannelRepository;

  constructor() {
    this.channelRepository = getCustomRepository(ChannelRepository);
  }

  async add(channelName: string, file: any, user?: any) {
    if (
      (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") &&
      file.size > 2 * 1024 * 1024
    ) {
      throw new ResponseError("Image file cannot exceed 2MB", 400);
    }

    const avatar = await uploadImage(file.buffer, file);

    const channel = {
      name: channelName,
      avatarUrl: avatar.Location,
      avatarKey: avatar.Key,
      user,
    };

    const createdChannel = this.channelRepository.create(channel);

    if (user) {
      createdChannel.user = user;
    }

    await this.channelRepository.save(createdChannel);

    return createdChannel;
  }

  async all(options?: FindManyOptions<Channel>) {
    const channels = await this.channelRepository.find(options);

    return channels as IChannelWithoutUserPassword[];
  }

  async byId(id: string, options?: FindOneOptions<Channel>) {
    const channel = await this.channelRepository.findOne({ id }, options);

    return channel as IChannelWithoutUserPassword;
  }

  async update(id: string, channelName?: string, file?: any) {
    const channel = await this.channelRepository.findOne({ id });

    if (channelName && channel) {
      channel.name = channelName;
    }

    if (file && channel) {
      await deleteData(channel.avatarKey);
      const avatar = await uploadImage(file.buffer, file);
      channel.avatarKey = avatar.Key;
      channel.avatarUrl = avatar.Location;
    }

    await this.channelRepository.update(id, channel as Channel);
    const updated = await this.channelRepository.findOne({ id });

    return updated;
  }

  async delete(id: string, userId: string) {
    const channel = await this.channelRepository.findOne(
      { id },
      { relations: ["videos"] }
    );

    if (!channel) {
      throw new ResponseError("Channel not found", 404);
    }

    const videos = new VideoServices();
    channel.videos.map(async (video) => {
      const messege = await videos.DeleteVideo(video.id, { id: userId });
      return messege;
    });

    await deleteData(channel?.avatarKey);

    await this.channelRepository.delete({ id });

    return "channel has been deleted";
  }

  async findChannelByUserId(uuid: string) {
    const channelRepository = getCustomRepository(ChannelRepository);
    const channels = await channelRepository.find({ relations: ["user"] });
    const channel = channels.find((item) => item.user.id === uuid);
    return channel;
  }
}
