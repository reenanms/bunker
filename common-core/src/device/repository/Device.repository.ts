

import { Device, PrismaClient as PrismaSQL } from "../../SQL/prisma/client";
import { GenericCRUDRepository } from "../../common/repository/GenericCRUD.repository";

export type DeviceKey = {
  id: string
};

export class DeviceRepository extends GenericCRUDRepository<Device, DeviceKey> {
  constructor(readonly prisma: PrismaSQL) {
    super(prisma);
  }

  protected getKey(data: Device): DeviceKey {
    return { id: data.id };
  }
  
  protected getPrismaDelegate() {
    return this.prisma.device;
  }
}
