import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories";

export const DuplicateEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const usersRepository = getCustomRepository(UsersRepositories);
  const userEmail = await usersRepository.findOne({
    email: req.body.email,
  });

  if (userEmail)
    return res.status(409).json({ message: "E-mail already registered" });
  next();
};
