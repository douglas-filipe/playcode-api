import { EntityRepository, Repository } from "typeorm";
import User from "../entities/user.entity";

@EntityRepository(User)
class UsersRepositories extends Repository<User> {}

export { UsersRepositories };
