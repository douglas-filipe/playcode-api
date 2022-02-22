import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import Room from "./room.entity";
import User from "./user.entity";

@Entity("messages")
export default class Messages {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  user_id!: string;

  @Column()
  text!: string;

  @Column()
  room_id!: string;

  @ManyToOne((type) => User, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne((type) => Room, (room) => room.id)
  @JoinColumn({ name: "room_id" })
  room!: Room;

  @CreateDateColumn()
  createdOn!: Date;

  @CreateDateColumn()
  updatedOn!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
