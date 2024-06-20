

import model from "../../SQL/prisma/client";
import { GenericCRUDWithFilterRepository } from "../../common/repository/GenericCRUDWithFilter.repository";

export type DeviceTokenKey = {
  id: string
};

export class DeviceTokenRepository extends GenericCRUDWithFilterRepository<model.DeviceToken, DeviceTokenKey, model.Prisma.DeviceTokenWhereInput> {
  constructor(readonly prisma: model.PrismaClient) {
    super(prisma);
  }

  protected getKey(data: model.DeviceToken): DeviceTokenKey {
    return { id: data.id };
  }
  
  protected getPrismaDelegate() {
    this.prisma.deviceToken.findMany();
    return this.prisma.deviceToken;
  }
}
