import { PrismaClient as PrismaNoSQL } from "../../noSQL/prisma/client";


export class DeviceDataRepository {
  constructor(readonly prisma: PrismaNoSQL) { }

  public async create(deviceId: string, data: string) {
    const deviceData = await this.prisma.deviceData.create({
      data: {
        deviceId,
        data
      }
    });
    
    return deviceData;
  }
}
