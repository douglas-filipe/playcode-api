import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import Comments from "./Comments";
import bcryptjs from "bcryptjs";
import { v4 as uuid } from "uuid";
import Channel from "./channel.entity";

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

  @OneToMany((type) => Comments, (comments) => comments.user)
  comments!: Comments[];

  @ManyToMany((type) => Channel, (channels) => channels.subs)
  channels!: Channel[];

  @BeforeUpdate()
  updateDate() {
    this.updatedOn = new Date();
  }

  @BeforeInsert()
  hashPassword() {
    this.password = bcryptjs.hashSync(this.password, 10);
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
