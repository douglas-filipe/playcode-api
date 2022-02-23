import { EntityRepository, Repository } from "typeorm";
import Channel from "../entities/channel.entity";

@EntityRepository(Channel)
class ChannelRepository extends Repository<Channel> {}

export { ChannelRepository };
