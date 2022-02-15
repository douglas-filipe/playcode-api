import { EntityRepository, Repository } from "typeorm";
import { Channel } from "../entities";

@EntityRepository(Channel)
class ChannelRepository extends Repository<Channel> {}

export default ChannelRepository;
