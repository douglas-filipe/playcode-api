import { EntityRepository, Repository } from "typeorm";
import CommentsLikes from "../entities/comments-likes.entity";

@EntityRepository(CommentsLikes)
class CommentsLikesRepositories extends Repository<CommentsLikes> {}

export { CommentsLikesRepositories };
