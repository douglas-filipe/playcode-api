import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../errors";
import { ChannelService, CommentsService, VideoServices } from "../services";

export const verifyOwner =
  (credential: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let userId: string | undefined;
      const { user } = req;
      const { id } = req.params;
      const credentials = {
        channel: "channel",
        video: "video",
        comment: "comment",
      };

      if (!user?.id) {
        throw new ResponseError("User ID is undefined", 401);
      }

      if (!Object.values(credentials).includes(credential)) {
        throw new ResponseError("Missing credential athourization", 401);
      }

      if (credential === credentials.channel) {
        const channelService = new ChannelService();
        const channel = await channelService.byId(id, { relations: ["user"] });

        if (!channel.user.id) {
          throw new ResponseError("relation user id not found", 404);
        }

        userId = channel.user.id;
      }

      if (credential === credentials.video) {
        const videoService = new VideoServices();
        const video = await videoService.withUserIdById(id, {
          relations: ["channel"],
        });

        if (!video?.userId) {
          throw new ResponseError("relation user id not found", 404);
        }

        userId = video?.userId;
      }

      if (credential === credentials.comment) {
        const commentService = new CommentsService();
        const comment = await commentService.byId(id, { relations: ["user"] });

        if (!comment?.user) {
          throw new ResponseError("relation user id not found", 404);
        }

        userId = comment?.user.id;
      }

      if (user.id !== userId) {
        throw new ResponseError("Missing owner authorization", 401);
      }

      return next();
    } catch (e: any) {
      next(e);
    }
  };
