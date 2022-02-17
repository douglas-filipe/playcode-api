import { PrimaryGeneratedColumn, ManyToMany, Entity, JoinTable } from "typeorm";
import { User } from ".";
import { Channel } from ".";
import { v4 as uuidv4 } from "uuid";

@Entity("subscribers")
class Subscribers {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToMany(() => User)
  @JoinTable({ name: "userId" })
  user!: User;

  @ManyToMany(() => Channel)
  @JoinTable({ name: "channelId" })
  channel!: Channel;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
export default Subscribers;
