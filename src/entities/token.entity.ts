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

  token!: string;

  @OneToOne((type) => User, (user) => user.id)
  @JoinTable()
  user_id!: User[];

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
