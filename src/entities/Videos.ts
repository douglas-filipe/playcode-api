import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import Comments from "./Comments";
// import Channel from "./Channel";

@Entity("videos")
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

  @Column({ nullable: true, type: "integer" })
  views!: number;

  @Column({ type: "varchar" })
  tumbkey!: string;

  @Column({ type: "varchar" })
  duration!: string;

  @OneToMany((type) => Comments, (comments) => comments.video)
  comments!: Comments[];

  // @OneToMany((type) => Channel, (channel) => channel.id)
  // channel_id!: Channel[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}