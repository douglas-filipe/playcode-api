import { EntityRepository, Repository } from "typeorm";
import { Tags } from "../entities";

@EntityRepository(Tags)
class TagsRepository extends Repository<Tags> {}

export { TagsRepository };
