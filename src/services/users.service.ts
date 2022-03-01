import { getCustomRepository } from "typeorm";
import { ResponseError } from "../errors";
import { ChannelRepository, UsersRepositories } from "../repositories";
import { IRequestBody } from "../types";
import { ILoginUser } from "../types/IUser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import User from "../entities/user.entity";
import { TokenRepositories } from "../repositories/token.repository";
import { sendEmailToUser } from "../utils/sendEmailToUser";
import { ChannelService } from "./channel.service";

interface Idecoded {
  id: string;
  user_id: string;
}

export class UsersServices {
  usersRepository: UsersRepositories;
  tokenRepository: TokenRepositories;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepositories);
    this.tokenRepository = getCustomRepository(TokenRepositories);
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
    const channelRepository = getCustomRepository(ChannelRepository);

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

    const channel = await channelRepository.findOne({
      relations: ["videos", "subs"],
      where: { user: user?.id },
    });

    if (channel !== undefined) {
      return { user, channel };
    }

    return user;
  }

  async Delete(uuid: string) {
    const userRepository = getCustomRepository(UsersRepositories);
    const user = await userRepository.findOne({ id: uuid });
    if (!user) {
      return false;
    }
    const channelService = new ChannelService();
    const channel = await channelService.findChannelByUserId(uuid);

    if (channel) {
      const channelService = new ChannelService();
      await channelService.delete(channel.id, uuid);
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

  async sendTokenToEmail(email: string) {
    const user = await this.usersRepository.findOne({ email: email });
    if (!user) throw new Error("User not found");
    const token = await this.tokenRepository.findOne({
      where: { user_id: user.id },
    });
    if (token) await this.tokenRepository.delete(token.id);
    const resetToken = jwt.sign({ id: user.id }, process.env.SECRET as string);
    const hashToken = bcryptjs.hashSync(resetToken, 10);
    const newToken = this.tokenRepository.create({
      token: hashToken,
      user_id: user.id,
    });
    await this.tokenRepository.save(newToken);
    const subject = "Alteração de senha";
    const text = `Seu token para recuperação de senha: ${resetToken}`;
    sendEmailToUser(email, text, subject);
    return "Email sent";
  }

  async resetPassword(token: string, password: string) {
    const decoded = jwt.verify(token, process.env.SECRET as string) as Idecoded;
    const user = await this.usersRepository.findOne({ id: decoded.id });
    if (!user) throw new Error("User not found");
    const passwordResetToken = await this.tokenRepository.findOne({
      user_id: user.id,
    });
    if (!passwordResetToken) {
      throw new Error("Invalid or expired password reset token");
    }
    const isValid = bcryptjs.compareSync(token, passwordResetToken.token);
    if (!isValid) {
      throw new Error("Invalid or expired password reset token");
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    user.password = hashedPassword;
    await this.usersRepository.save(user);
    return "Your password is change";
  }
}
