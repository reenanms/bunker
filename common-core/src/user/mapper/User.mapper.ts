import model from "../../SQL/prisma/client";
import { ModelEntityMapper } from "../../common/mapper/ModelEntity.mapper";
import { User } from "../entity/User";


export class UserMapper implements ModelEntityMapper<model.User, User> {
  public mapEntityToModel(entity: User): model.User {
    return entity;
  }

  public mapModelToEntity(modelEntity: model.User): User {
    return modelEntity;
  }
}
