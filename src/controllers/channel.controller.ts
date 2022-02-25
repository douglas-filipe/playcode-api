import { Request, Response } from "express";
import { ChannelService, UsersServices } from "../services";
import { ResponseError } from "../errors";
import { IUSerWithoutPassword } from "../types/IUser";

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
      const newChannel = await channelService.add(channelName, file, req.user);

      // newChannel.user.password = "*".repeat(8);

      return res.status(201).json(newChannel);
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  }

  static async all(req: Request, res: Response) {
    try {
      const channelService = new ChannelService();
      const channels = await channelService.all({ relations: ["user"] });

      const secureChannels = channels.map((channel) => {
        let newChannel = channel;
        const { password, ...secureUser } = channel.user;
        newChannel.user = secureUser;
        return newChannel;
      });

      return res.json(secureChannels);
    } catch (e: any) {}
  }

  static async byId(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const channelService = new ChannelService();
      const channel = await channelService.byId(id, {
        relations: ["user", "videos", "subs"],
      });

      if (!channel) {
        throw new ResponseError("user not found", 404);
      }

      const { password, ...userWithoutPassword } = channel.user;
      let secureChannel = channel;
      secureChannel.user = userWithoutPassword;

      return res.json(secureChannel);
    } catch (e: any) {
      if (!e.statusCode) {
        return res.status(400).json({ message: e.message });
      }

      return res.status(e.statusCode).json({ message: e.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const channelName = req.body.name;
      const files: any = req.files;

      let file = files.find((file: any) => file.fieldname === "img");

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
      const { idUser } = req;

      const channelService = new ChannelService();
      const response = await channelService.delete(id, idUser as string);

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
