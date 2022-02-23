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

@Entity("token")
export default class Token {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  token!: string;

  @Column()
  user_id!: string;

  @OneToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user!: User;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
