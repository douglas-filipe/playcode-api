import { EntityRepository, Repository } from "typeorm";
import { Tags } from "../entities/tags.entity";

@EntityRepository(Tags)
class TagsRepository extends Repository<Tags> {}

export { TagsRepository };
