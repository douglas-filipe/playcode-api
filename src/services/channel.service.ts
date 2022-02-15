import { getCustomRepository } from "typeorm";
import { Channel } from "../entities";
import { ChannelRepository } from "../repositories";

export default class ChannelService {
  channelRepository: ChannelRepository;

  constructor() {
    this.channelRepository = getCustomRepository(ChannelRepository);
  }

  async add(channel: Channel) {
    const createdChannel = this.channelRepository.create(channel);
    await this.channelRepository.save(createdChannel);

    return createdChannel;
  }
}
