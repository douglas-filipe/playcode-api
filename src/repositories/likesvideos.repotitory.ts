import { EntityRepository, Repository } from "typeorm";
import LikesVideos from "../entities/likesvideos.entity";

@EntityRepository(LikesVideos)
class LikesVideosRepository extends Repository<LikesVideos> {}

export { LikesVideosRepository };
