import { EntityRepository, Repository } from "typeorm";
import Comments from "../entities/Comments";

@EntityRepository(Comments)
class CommentsRepository extends Repository<Comments> {}

export default CommentsRepository;
