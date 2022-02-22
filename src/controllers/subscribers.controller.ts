import { Request, Response } from "express";
import { SubscribersService } from "../services/subscribers.service";

export class SubscribersControllers {
  static async SubscribeInToChannel(req: Request, res: Response) {
    try {
      const { idUser } = req;
      const subscribersService = new SubscribersService();
      const subscriber = await subscribersService.create(
        idUser as string,
        req.params.id
      );

      return res.status(200).json({ message: subscriber });
    } catch (e) {
      res.status(400).json({ message: (e as Error).message });
    }
  }

  static async ListAllSubscribers(req: Request, res: Response) {
    const subscribersService = new SubscribersService();

    const getAllSubscribers = await subscribersService.getAll();

    return res.status(200).json(getAllSubscribers);
  }

  static async UnsubscribeInToChannel(req: Request, res: Response) {
    const { id } = req.params;
    const { idUser } = req;

    const subscribersService = new SubscribersService();

    const deleteSubscription = await subscribersService.delete(
      id,
      idUser as string
    );

    return res.status(200).json({ message: deleteSubscription });
  }
}
