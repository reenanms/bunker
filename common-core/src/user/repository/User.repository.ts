import { PrismaClient as PrismaSQL } from "../../SQL/prisma/client";
import { GenericCRUDRepository } from "../../common/repository/GenericCRUD.repository";
import { User } from "../entity/User";




export type UserKey = {
  username: string
};

export class UserRepository extends GenericCRUDRepository<User, UserKey> {
  constructor(readonly prisma: PrismaSQL) {
    super(prisma);
  }

  protected getKey(data: User): UserKey {
    return { username: data.username };
  }
  
  protected getPrismaDelegate() {
    return this.prisma.user;
  }
}
