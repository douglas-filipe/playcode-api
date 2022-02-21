import { getCustomRepository } from "typeorm";
import { io } from "../app";
import { MessageRepository } from "../repositories/messageRepository";
import { RoomRepository } from "../repositories/rooms.repository";

interface Ibody {
  name: string;
}

interface ICreateMessageRequestBody {
  text: string;
  room_id: string;
  user_id: string;
  name: string;
}

export class ChatServices {
  roomRepository: RoomRepository;
  messageRepository: MessageRepository;

  constructor() {
    this.roomRepository = getCustomRepository(RoomRepository);
    this.messageRepository = getCustomRepository(MessageRepository);
  }
  async CreateRoom(body: Ibody) {
    const room = this.roomRepository.create({ ...body });
    await this.roomRepository.save(room);
    io.emit("room-created", room);
    return room;
  }

  async CreateMessage(body: ICreateMessageRequestBody) {
    const message = this.messageRepository.create({ ...body });
    await this.messageRepository.save(message);
    const { room_id } = message;
    /* const listMessages = await this.messageRepository.find({
      where: { room_id: body.room_id },
    }); */
    io.to(room_id).emit("message", message);
    return message;
  }

  async ListMessagesRoom(room_id: string) {
    const messages = this.messageRepository.find({ where: { room_id } });
    return messages;
  }
}
