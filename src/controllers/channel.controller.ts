import { Request, Response } from "express";
import { ChannelService, UsersServices } from "../services";
import { ResponseError } from "../errors";

export default class ChannelController {
  static async create(req: Request, res: Response) {
    try {
      const { idUser } = req;
      const channelName = req.body.name;
      const files: any = req.files;

      let file = files.find((file: any) => file.fieldname === "img");

      if (!file) {
        throw new ResponseError(
          "Field 'img' is required, allowed extensions (png, jpg, jpeg)",
          403
        );
      }

      const userService = new UsersServices();
      const user = await userService.usersRepository.findOne({
        id: idUser as string,
      }); // procurar usuario pelo id recebido pelo token

      const channelService = new ChannelService();
      const newChannel = await channelService.add(channelName, file, user);

      newChannel.user.password = "*".repeat(8);

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
      const channelName = req.body.name;
      const files: any = req.files;

      let file = files.find((file: any) => file.fieldname === "img");

      if (!file) {
        throw new ResponseError(
          "Field 'img' is required, allowed extensions (png, jpg, jpeg)",
          403
        );
      }

      const channelService = new ChannelService();
      const channel = await channelService.update(id, channelName, file);

      return res.json({ message: "channel updated", channel: channel });
    } catch (e: any) {
      if (e.statusCode) {
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
      if (e.statusCode) {
        return res.status(e.statusCode).json({ message: e.message });
      }
      const message = e.message;

      return res.status(400).json({ message });
    }
  }
}
