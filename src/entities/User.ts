import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @CreateDateColumn()
  createdOn!: Date;

  @CreateDateColumn()
  updatedOn!: Date;

  @BeforeUpdate()
  updateDate() {
    this.updatedOn = new Date();
  }

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
