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
import User from "./user.entity";
<<<<<<< HEAD
import Video from "./videos.entity";
=======
import Video from "./Videos";
>>>>>>> origin

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

  @ManyToMany((type) => User, (subs) => subs.subs)
  @JoinTable()
  subs!: User[];

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
