import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  JoinColumn,
} from "typeorm";
import { User } from ".";
// import { Videos } from ".";
import { v4 as uuidv4 } from "uuid";

@Entity("comments")
class Comments {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  description!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user!: User;

  /* 
  @ManyToMany(() => Videos)
    @JoinColumn({name: "video_id"})
    video!: Videos[];
  */
  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
export default Comments;
