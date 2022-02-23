import { EntityRepository, Repository } from "typeorm";
import Token from "../entities/token.entity";

@EntityRepository(Token)
class TokenRepositories extends Repository<Token> {}

export { TokenRepositories };
