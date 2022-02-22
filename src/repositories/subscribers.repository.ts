import { EntityRepository, Repository } from "typeorm";
import Subscribers from "../entities/subscribers.entity";

@EntityRepository(Subscribers)
class SubscribersRepository extends Repository<Subscribers> {}

export { SubscribersRepository };
