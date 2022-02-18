import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { LikesVideos } from ".";
import Comments from "./Comments";
// import Channel from "./Channel";

@Entity("video")
export default class Video {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "varchar" })
  thumburl!: string;

  @Column({ type: "varchar" })
  videourl!: string;

  @Column({ type: "varchar" })
  videokey!: string;

  @Column({ nullable: true, type: "integer", default: 0 })
  views!: number;

  @Column({ type: "varchar" })
  tumbkey!: string;

  @Column({ type: "varchar" })
  duration!: string;

  @Column({ type: "integer", nullable: true, default: 0 })
  likes!: number;

  @OneToMany((type) => Comments, (comments) => comments.video)
  comments!: Comments[];

  @OneToMany((type) => LikesVideos, (likes) => likes.video)
  likesvideos!: LikesVideos[];

  // @OneToMany((type) => Channel, (channel) => channel.id)
  // channel_id!: Channel[];

  @CreateDateColumn()
  createdOn!: Date;

  @CreateDateColumn()
  updatedOn!: Date;

  @BeforeUpdate()
  updateDate() {
    this.updatedOn = new Date();
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}