import model from "../../SQL/prisma/client";
import { GenericCreateUseCase } from "../../common/useCase/GenericCreate.usecase";
import { User } from "../entity/User";
import { UserKey, UserRepository } from "../repository/User.repository";
import { UserMapper } from "../mapper/User.mapper";


export class CreateUserUseCase
  extends GenericCreateUseCase<UserRepository, UserMapper, model.User, UserKey, User> {
  constructor(readonly repository: UserRepository) {
    super(repository, new UserMapper());
   }
}
