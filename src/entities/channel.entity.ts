import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

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

  // @OneToOne((type) => Users)
  // @JoinColumn()
  // user!: Users;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
