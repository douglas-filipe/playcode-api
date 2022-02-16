import { Request, Response } from "express";
import { ChannelService } from "../services";
import { ResponseError } from "../errors";

export default class ChannelController {
  static async create(req: Request, res: Response) {
    try {
      const channel = req.body;
      // const { userId } = req;

      const channelService = new ChannelService();
      const newChannel = await channelService.add(channel);

      // const userService = new UserService();
      // const user = userService.byId(userId);

      // user.channel = newChannel;

      // await userService.update(user);

      return res.status(201).json(newChannel);
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  }

  static async byId(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const channelService = new ChannelService();
      const channel = await channelService.byId(id);

      // if (!channel) {
      //   throw new ResponseError("Channel not found.", 400);
      // }

      return res.json(channel);
    } catch (e: any) {
      // if (e.message === "Channel not found.") {
      //   return res.status(e.statusCode).json({ message: e.message });
      // }
      //const message = e.message;
      return res.status(e.statusCode).json({ message: e.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { body } = req;

      const channelService = new ChannelService();
      const channel = await channelService.update(id, body);

      if (!channel) {
        throw new ResponseError("Channel not found.", 400);
      }

      return res.json({ message: "channel updated", channel: channel });
    } catch (e: any) {
      if (e.message === "Channel not found.") {
        return res.status(e.statusCode).json({ message: e.message });
      }

      const message = e.message;

      return res.status(400).json({ message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const channelService = new ChannelService();
      const response = await channelService.delete(id);

      return res.json({ message: response });
    } catch (e: any) {
      const message = e.message;

      return res.status(400).json({ message });
    }
  }
}
