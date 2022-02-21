import { EntityRepository, Repository } from "typeorm";
import { Messages } from "../entities";

@EntityRepository(Messages)
class MessageRepository extends Repository<Messages> {}

export { MessageRepository };
