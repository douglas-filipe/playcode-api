import { getCustomRepository } from "typeorm";
import { SubscribersRepository } from "../repositories/subscribers.repository";
import { UsersRepositories } from "../repositories/users.repository";
import { ChannelRepository } from "../repositories/channel.repository";

export class SubscribersService {
  subscribersRepository: SubscribersRepository;
  usersRepositories: UsersRepositories;
  channelRepository: ChannelRepository;

  constructor() {
    this.subscribersRepository = getCustomRepository(SubscribersRepository);
    this.usersRepositories = getCustomRepository(UsersRepositories);
    this.channelRepository = getCustomRepository(ChannelRepository);
  }

  async create(userId: string, channelId: string) {
    try {
      const channel = await this.channelRepository.findOne({ id: channelId });
      if (!channel) {
        throw new Error("Channel not found");
      }

      const subscriber = await this.subscribersRepository.findOne({
        where: {
          userId,
          channelId,
        },
      });

      if (!subscriber) {
        const newSub = this.subscribersRepository.create({
          userId,
          channelId,
        });
        await this.subscribersRepository.save(newSub);
        channel.subsNumber += 1;
        await this.channelRepository.update(channel.id, channel);
        return `You have successfull subscribed on ${newSub.channelId}`;
      }
      throw new Error(
        `You already subscribed in the channel ${subscriber.channelId}`
      );
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }

  async getAll() {
    try {
      const subs = await this.subscribersRepository.find();

      return subs;
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }

  async delete(id: string, userId: string) {
    try {
      const channel = await this.channelRepository.findOne({ id });

      if (!channel) {
        throw new Error("subscribed channel does not exist");
      }

      const subscriber = await this.subscribersRepository.findOne({
        where: { userId: userId, channelId: id },
      });

      if (!subscriber) {
        throw new Error("You not subscribe on this channel!");
      }

      channel.subsNumber -= 1;
      await this.channelRepository.update(channel.id, channel);

      await this.subscribersRepository.delete({ id: subscriber.id });

      return "Succesfull unsubscribed.";
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }
}
