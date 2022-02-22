import { IVideos } from ".";
import { IUSerWithoutPassword } from "./IUser";

export interface IChannelWithoutUserPassword {
  id: string;
  name: string;
  avatarUrl: string;
  avatarKey: string;
  user: IUSerWithoutPassword;
  videos?: IVideos[];
  subs?: IUSerWithoutPassword[];
}
