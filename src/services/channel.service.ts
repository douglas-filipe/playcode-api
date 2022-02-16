import { FindOneOptions, getCustomRepository } from "typeorm";
import { Channel } from "../entities";
import { ChannelRepository } from "../repositories";

export class ChannelService {
  channelRepository: ChannelRepository;

  constructor() {
    this.channelRepository = getCustomRepository(ChannelRepository);
  }

  async add(channel: Channel) {
    const createdChannel = this.channelRepository.create(channel);
    await this.channelRepository.save(createdChannel);

    return createdChannel;
  }

  async byId(id: string, options?: FindOneOptions<Channel>) {
    const channel = await this.channelRepository.findOne({ id }, options);

    return channel;
  }

  async update(id: string, channel: Channel) {
    await this.channelRepository.update(id, channel);
    const updated = await this.channelRepository.findOne({ id });

    return updated;
  }

  async delete(id: string) {
    await this.channelRepository.delete({ id });

    return "channel has been deleted";
  }
}
