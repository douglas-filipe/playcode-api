import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import User from "./user.entity";
import Video from "./videos.entity";
import LikesComments from "./likescomments.entity";

@Entity("comments")
class Comments {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  description!: string;

  @Column({ type: "integer", nullable: true, default: 0 })
  likes!: number;

  @ManyToOne((type) => User, (user) => user.comments, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne((type) => Video, (video) => video.comments, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "video_id" })
  video!: Video;

  @OneToMany((type) => LikesComments, (likes) => likes.comments)
  likescomments!: LikesComments[];

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
export default Comments;
