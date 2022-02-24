import { IChannelWithoutUserPassword } from "./IChannel";
import { IUSerWithoutPassword } from "./IUser";

export interface ISub {
  id: string;
  userId: string;
  channelId: string;
  user?: IUSerWithoutPassword;
  channel?: IChannelWithoutUserPassword;
}
