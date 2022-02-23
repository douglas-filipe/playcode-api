import { getCustomRepository } from "typeorm";
import { ResponseError } from "../errors";
import { UsersRepositories } from "../repositories";
import { IRequestBody } from "../types";
import { ILoginUser } from "../types/IUser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import User from "../entities/user.entity";

export class UsersServices {
  usersRepository: UsersRepositories;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepositories);
  }
  async CreateUser(body: IRequestBody) {
    const user = this.usersRepository.create({
      ...body,
    });
    await this.usersRepository.save(user);
    const { password, ...others } = user;
    return others;
  }

  async Authenticate(data: ILoginUser) {
    const { email, password } = data;

    const user = await this.usersRepository.findOne({
      email,
    });

    if (user === undefined || !bcrypt.compareSync(password, user.password)) {
      throw new ResponseError("invalid credentials", 401);
    } else {
      const token = jwt.sign({ uuid: user.id }, process.env.SECRET as string, {
        expiresIn: "1d",
      });

      const { password, ...others } = user;

      return { token, ...others };
    }
  }

  async ById(uuid: string) {
    const userRepository = getCustomRepository(UsersRepositories);
    const user = await userRepository
      .createQueryBuilder("users")
      .select([
        "users.id",
        "users.name",
        "users.email",
        "users.createdOn",
        "users.updatedOn",
      ])
      .where("users.id = :id", { id: uuid })
      .getOne();

    return user;
  }

  async Delete(uuid: string) {
    const userRepository = getCustomRepository(UsersRepositories);
    const user = await userRepository.findOne({ id: uuid });
    if (!user) {
      return false;
    }
    await userRepository.delete({ id: uuid });
    return "user has been deleted";
  }

  async UpdateUser(id: string, body: IRequestBody) {
    try {
      const user = await this.usersRepository.findOne({ id });
      if (!user) throw new Error("User Not Found");
      if (body.password) {
        const hashedPassword = bcryptjs.hashSync(body.password, 10);
        body.password = hashedPassword;
      }
      await this.usersRepository
        .createQueryBuilder()
        .update(User)
        .set(body)
        .where("users.id = :id", { id })
        .execute();
      const newUser = await this.usersRepository
        .createQueryBuilder("users")
        .select([
          "users.id",
          "users.name",
          "users.email",
          "users.createdOn",
          "users.updatedOn",
        ])
        .where("users.id = :id", { id })
        .getOne();
      return newUser;
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }
}
