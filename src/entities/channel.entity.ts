import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { User, Video } from ".";
import Subscribers from "./subscribers.entity";

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
