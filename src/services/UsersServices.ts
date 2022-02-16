import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories";
import { IRequestBody } from "../types";

export default class UsersServices {
  async CreateUser(body: IRequestBody) {
    const usersRepository = getCustomRepository(UsersRepositories);
    const user = usersRepository.create({
      ...body,
    });
    await usersRepository.save(user);
    const { password, ...others } = user;
    return others;
  }
}
