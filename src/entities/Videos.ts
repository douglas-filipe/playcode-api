import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
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

  @Column({ type: "integer" })
  views!: number;

  @Column({ type: "varchar" })
  tumbkey!: string;

  @Column({ type: "varchar" })
  duration!: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
