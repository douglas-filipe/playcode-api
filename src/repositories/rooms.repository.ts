import { EntityRepository, Repository } from "typeorm";
import { Room } from "../entities";

@EntityRepository(Room)
class RoomRepository extends Repository<Room> {}

export { RoomRepository };
