import { EntityRepository, Repository } from "typeorm";
import CommentsLikes from "../entities/likescomments.entity";

@EntityRepository(CommentsLikes)
class CommentsLikesRepositories extends Repository<CommentsLikes> {}

export { CommentsLikesRepositories };
