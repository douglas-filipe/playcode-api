export interface IVideos {
  name: string;
  description: string;
  duration: string;
  channelId?: string;
}
export interface IFiles {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: object;
  size: number;
}
