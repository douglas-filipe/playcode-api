import { EntityRepository, Repository } from "typeorm";
import Video from "../entities/videos.entity";

@EntityRepository(Video)
class VideoRepositories extends Repository<Video> {}

export { VideoRepositories };
