import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { User } from ".";

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

  @ManyToMany((type) => User, (subs) => subs.channels)
  subs!: User[];

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
