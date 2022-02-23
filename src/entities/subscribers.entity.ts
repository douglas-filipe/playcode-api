import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import User from "./user.entity";
import Channel from "./channel.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("subscribers")
export default class Subscribers {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  userId!: string;

  @Column()
  channelId!: string;

  @ManyToOne((type) => User, (user) => user.id)
  @JoinColumn({ name: "userId" })
  user!: User;

  @ManyToOne((type) => Channel, (channel) => channel.id)
  @JoinColumn({ name: "channelId" })
  channel!: Channel;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
