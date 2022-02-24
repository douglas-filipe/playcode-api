import { IRequestBody } from "./IUser";
import { IVideos } from "./IVideo";

export interface IComments {
  description: string;
  user: {
    id: string;
  };
  videoId: string;
}
