export interface IVideos {
  name: string;
  description: string;
  thumburl: string;
  videourl: string;
  videokey: string;
  views: number;
  tumbkey: string;
  duration: string;
}

export interface ErrorsYup {
  errors: [string];
}
