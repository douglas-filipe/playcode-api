import { getCustomRepository } from "typeorm";
import { ResponseError } from "../errors";
import { UsersRepositories } from "../repositories";
import { IRequestBody } from "../types";
import { ILoginUser } from "../types/IUser";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


export class UsersServices {
  
  async CreateUser(body: IRequestBody) {
    const usersRepository = getCustomRepository(UsersRepositories);
    const user = usersRepository.create({
      ...body,
    });
    await usersRepository.save(user);
    const { password, ...others } = user;
    return others;
  }

  async Authenticate(data: ILoginUser){
    
    const { email, password } = data

    const user = await getCustomRepository(UsersRepositories).findOne({ email });

    if ( user === undefined || !bcrypt.compareSync(password, user.password)){

      throw new ResponseError('invalid credentials', 401)
      return
    
    }else{
      
      const token = jwt.sign({ uuid: user.id }, process.env.SECRET as string, {expiresIn: '1d'})
      return token
    
    }
  }
  
}
