import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepository";

interface IRequestBody {
  name: string;
  email: string;
  password: string;
}

export class UsersServices {
  usersRepository = getCustomRepository(UsersRepositories);
  async CreateUser(body: IRequestBody) {
    const user = this.usersRepository.create({
      ...body,
    });
    await this.usersRepository.save(user);
    return user;
  }
}
