import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import Subscribers from "./subscribers.entity";
import User from "./user.entity";
import Video from "./videos.entity";

@Entity()
export default class Channel {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  avatarUrl!: string;

  @Column()
  avatarKey!: string;

  @Column({ default: 0 })
  subsNumber!: number;

  @OneToOne((type) => User)
  @JoinColumn()
  user!: User;

  @OneToMany((type) => Video, (video) => video.channel)
  videos!: Video[];

  @OneToMany((type) => Subscribers, (subs) => subs.channel)
  subs!: Subscribers[];

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
