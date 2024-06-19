import { DeviceData, PrismaClient as PrismaNoSQL } from "../../noSQL/prisma/client";


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

  public async read(deviceId: string) : Promise<DeviceData[]> {
    const deviceData = await this.prisma.deviceData.findMany({
      where: { deviceId }
    });
    
    return deviceData;
  }
}
