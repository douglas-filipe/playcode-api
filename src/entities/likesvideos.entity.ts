import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import User from "./user.entity";
import Video from "./videos.entity";

@Entity("likesvideos")
export default class LikesVideos {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  user_id!: string;

  @Column()
  video_id!: string;

  @ManyToOne((type) => User, (user) => user.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne((type) => Video, (video) => video.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "video_id" })
  video!: Video;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
