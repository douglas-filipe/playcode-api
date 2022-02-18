import { EntityRepository, Repository } from "typeorm";
import { LikesVideos } from "../entities";

@EntityRepository(LikesVideos)
class LikesVideosRepository extends Repository<LikesVideos> {}

export { LikesVideosRepository };
