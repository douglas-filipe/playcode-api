import {
  Column,
  Entity,
  ManyToOne,
  BeforeUpdate,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import Channel from "./channel.entity";
import Comments from "./comments.entity";
import LikesVideos from "./likesvideos.entity";

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

  @CreateDateColumn()
  createdOn!: Date;

  @CreateDateColumn()
  updatedOn!: Date;

  @BeforeUpdate()
  updateDate() {
    this.updatedOn = new Date();
  }

  @ManyToOne((type) => Channel, (channel) => channel.videos, {
    onDelete: "CASCADE",
  })
  channel!: Channel;

  @OneToMany((type) => Comments, (comments) => comments.video)
  comments!: Comments[];

  @OneToMany((type) => LikesVideos, (likes) => likes.video)
  likesvideos!: LikesVideos[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
