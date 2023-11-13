import { PrismaClient } from "../../src/SQL/prisma/client";
import { Device } from "../../src/deviceData/entity/Device";
import { DeviceModel } from "../../src/deviceData/entity/DeviceModel";

/*
export class DataConsistency {
  static async deviceModel(prisma: PrismaClient, deviceModel: DeviceModel) {
    const foundItens = await prisma.deviceModel.findMany({
      where: {
        id: deviceModel.id
      }
    });

    if (foundItens.length > 0)
      return;

    await prisma.deviceModel.create({
      data: {
        id: deviceModel.id,
        description: deviceModel.description,
        dataType: {
          connect: {
            name: deviceModel.schema.name
          }
        }
      }
    });
  }

  static async device(prisma: PrismaClient, device: Device) {
    const foundItens = await prisma.device.findMany({
      where: {
        id: device.id
      }
    });

    if (foundItens.length > 0)
      return;

    await prisma.device.create({
      data: {
        id: device.id,
        deviceModel: {
          connect: {
            id: device.model.id
          }
        }
      }
    });
  }
}
*/