import { EntityRepository, Repository } from "typeorm";
import LikesComments from "../entities/likescomments.entity";

@EntityRepository(LikesComments)
class LikesCommentsRepository extends Repository<LikesComments> {}

export { LikesCommentsRepository };
