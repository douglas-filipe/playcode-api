import { EntityRepository, Repository } from "typeorm";
import Video from "../entities/Videos";

@EntityRepository(Video)
class VideoRepositories extends Repository<Video> {}

export { VideoRepositories };
