import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import User from "./user.entity";
import Video from "./Videos";
import { v4 as uuidv4 } from "uuid";

@Entity("comments")
class Comments {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  description!: string;

  @ManyToOne((type) => User, (user) => user.comments)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne((type) => Video, (video) => video.comments)
  @JoinColumn({ name: "video_id" })
  video!: Video;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
export default Comments;
