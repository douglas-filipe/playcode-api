import { EntityRepository, Repository } from "typeorm";
import Messages from "../entities/message.entity";

@EntityRepository(Messages)
class MessageRepository extends Repository<Messages> {}

export { MessageRepository };
