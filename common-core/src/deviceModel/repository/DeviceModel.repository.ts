

import model from "../../SQL/prisma/client";
import { GenericCRUDWithFilterRepository } from "../../common/repository/GenericCRUDWithFilter.repository";

export type DeviceModelKey = {
  id: string;
};

export class DeviceModelRepository extends GenericCRUDWithFilterRepository<model.DeviceModel, DeviceModelKey, model.Prisma.DeviceModelWhereInput> {
  constructor(readonly prisma: model.PrismaClient) {
    super(prisma);
  }

  protected getKey(data: model.DeviceModel): DeviceModelKey {
    return { id: data.id };
  }
  
  protected getPrismaDelegate() {
    return this.prisma.deviceModel;
  }
}
