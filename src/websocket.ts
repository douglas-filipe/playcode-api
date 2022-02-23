import { io } from "./app";
import { RoomRepository } from "./repositories/rooms.repository";
import { MessageRepository } from "./repositories/messageRepository";
import { getCustomRepository } from "typeorm";
import { Express } from "express";

export class Chat {
  static webSocket(app: Express) {
    io.on("connection", (socket) => {
      const room = getCustomRepository(RoomRepository);
      const message = getCustomRepository(MessageRepository);
      //Listar as salas
      room.find().then((result) => {
        socket.emit("output-rooms", result);
      });

      //Criar sala
      socket.on("create-room", (name) => {
        const newRoom = room.create({ name });
        room.save(newRoom).then((result) => {
          io.emit("room-created", result);
        });
      });

      //Logar usuário

      socket.on("join", ({ name, room_id, user_id }) => {
        socket.join(room_id);
      });

      /* socket.on("sendMessage", (text, room_id, user_id, name) => {
        if (!room_id || !user_id || !name) {
          return app.response.status(400).json("Error");
        }
        const msgToStore = {
          name,
          user_id,
          room_id,
          text,
        };

        console.log("message", msgToStore);
        const msg = message.create(msgToStore);
        message.save(msg).then((result) => {
          io.to(room_id).emit("message", result);
          //callback();
        });
      }); */

      socket.on("sendMessage", (message, room_id) => {
        io.to(room_id).emit("message", message);
        //callback();
      });

      socket.on("messagesList", (message, room_id) => {
        io.to(room_id).emit("message", message);
        //callback();
      });

      //Histórico de mensagens
      socket.on("get-messages-history", (room_id) => {
        message.find({ where: { room_id } }).then((result) => {
          socket.emit("output-messages", result);
        });
      });
    });
  }
}
