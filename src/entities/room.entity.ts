import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("room")
export default class Room {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  img!: string;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
