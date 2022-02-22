import { EntityRepository, Repository } from "typeorm";
import Comments from "../entities/comments.entity";

@EntityRepository(Comments)
class CommentsRepository extends Repository<Comments> {}

export { CommentsRepository };
