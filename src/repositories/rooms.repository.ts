import { EntityRepository, Repository } from "typeorm";
import Room from "../entities/room.entity";

@EntityRepository(Room)
class RoomRepository extends Repository<Room> {}

export { RoomRepository };
