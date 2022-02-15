import { Request, Response } from "express";
import { ChannelService } from "../services";

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

      return res.json(newChannel);
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  }
}
