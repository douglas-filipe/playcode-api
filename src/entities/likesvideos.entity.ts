import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { User, Video } from ".";

@Entity("likesvideos")
export default class LikesVideos {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  user_id!: string;

  @Column()
  video_id!: string;

  @OneToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne(() => Video)
  @JoinColumn({ name: "video_id" })
  video!: Video;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
