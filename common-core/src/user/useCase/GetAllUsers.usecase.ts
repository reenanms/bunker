import model from "../../SQL/prisma/client";
import { User } from "../entity/User";
import { UserKey, UserRepository } from "../repository/User.repository";
import { UserMapper } from "../mapper/User.mapper";
import { GenericGetAllUseCase } from "../../common/useCase/GenericGetAll.usecase";


export class GetAllUsersUseCase
  extends GenericGetAllUseCase<UserRepository, UserMapper, model.User, UserKey, User> {
  constructor(readonly repository: UserRepository) {
    super(repository, new UserMapper());
   }
}
