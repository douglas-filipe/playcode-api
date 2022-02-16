import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from "typeorm";
import { User } from ".";
import { Video } from ".";
import { v4 as uuidv4 } from "uuid";

@Entity("comments")
class Comments {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  description!: string;

  @ManyToOne(() => User)
  @JoinTable({ name: "user_id" })
  user!: User;

  @ManyToMany(() => Video)
  @JoinColumn({ name: "video_id" })
  video!: Video;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
export default Comments;
