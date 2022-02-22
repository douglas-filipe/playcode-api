import { FindManyOptions, FindOneOptions, getCustomRepository } from "typeorm";
import { Channel, User } from "../entities";
import { ResponseError } from "../errors";
import { ChannelRepository } from "../repositories";
import { IChannelWithoutUserPassword } from "../types/IChannel";
import { deleteData, uploadData } from "../utils/VideoDataManager";

export class ChannelService {
  channelRepository: ChannelRepository;

  constructor() {
    this.channelRepository = getCustomRepository(ChannelRepository);
  }

  async add(channelName: string, file: any, user?: User) {
    if (
      (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") &&
      file.size > 2 * 1024 * 1024
    ) {
      throw new ResponseError("Image file cannot exceed 2MB", 400);
    }

    const avatar = await uploadData(file.buffer, file);

    const channel = {
      name: channelName,
      avatarUrl: avatar.Location,
      avatarKey: avatar.Key,
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
      const avatar = await uploadData(file.buffer, file);
      channel.avatarKey = avatar.Key;
      channel.avatarUrl = avatar.Location;
    }

    await this.channelRepository.update(id, channel as Channel);
    const updated = await this.channelRepository.findOne({ id });

    return updated;
  }

  async delete(id: string) {
    const channel = await this.channelRepository.findOne({ id });

    await deleteData(channel?.avatarKey);

    await this.channelRepository.delete({ id });

    return "channel has been deleted";
  }
}
