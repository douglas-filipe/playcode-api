import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import Comments from "./Comments";
import User from "./user.entity";

@Entity("commentslikes")
export default class CommentsLikes {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  userid!: string;

  @Column()
  commentid!: string;

  @ManyToOne((type) => User, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne((type) => Comments, (comments) => comments.id)
  @JoinColumn({ name: "comment_id" })
  comments!: Comments;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
