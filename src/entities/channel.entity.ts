import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { User, Video } from ".";

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

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
