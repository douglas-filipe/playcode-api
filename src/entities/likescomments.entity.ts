import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { User, Comments } from ".";

@Entity("likescomments")
export default class LikesComments {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  user_id!: string;

  @Column()
  comment_id!: string;

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
