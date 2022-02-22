import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import User from "./user.entity";
<<<<<<< HEAD
import Video from "./videos.entity";
=======
import Video from "./Videos";
>>>>>>> origin

@Entity("likesvideos")
export default class LikesVideos {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  user_id!: string;

  @Column()
  video_id!: string;

  @ManyToOne((type) => User, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne((type) => Video, (video) => video.id)
  @JoinColumn({ name: "video_id" })
  video!: Video;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
