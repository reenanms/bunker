import { PrismaClient as PrismaSQL } from "../../noSQL/prisma/client";


export class DeviceDataRepository {
  constructor(readonly prisma: PrismaSQL) { }

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
