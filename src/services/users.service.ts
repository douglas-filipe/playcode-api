import { getCustomRepository } from "typeorm";
import { ResponseError } from "../errors";
import { UsersRepositories } from "../repositories";
import { IRequestBody } from "../types";
import { ILoginUser } from "../types/IUser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

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

      return token;
    }
  }

  async ById(uuid: string | undefined) {
    const userRepository = getCustomRepository(UsersRepositories);
    const user = userRepository.findOne({ id: uuid });
    return user;
  }

  async UpdateUser(id: string, body: IRequestBody) {
    try {
      const { password, email, name } = body;
      const user = await this.usersRepository.findOne({ id });
      if (!user) throw new Error("User Not Found");
      const hashedPassword = bcryptjs.hashSync(password, 10);
      user.password = password ? hashedPassword : user.password;
      user.email = email ? email : user.email;
      user.name = name ? name : user.name;
      await this.usersRepository.save(user);
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdOn: user.createdOn,
        updatedOn: user.updatedOn,
      };
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }
}
