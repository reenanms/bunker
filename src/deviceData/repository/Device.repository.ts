

import { PrismaClient } from "../../SQL/prisma/client";
import { AlreadyRegisteredError } from "../../basic/error/AlreadyRegisteredError";
import { Device } from "../entity/Device";
import { DeviceModel } from "../entity/DeviceModel";

export class DeviceRepository {
  constructor(readonly prisma: PrismaClient) { }

  public async getDeviceSchemaName(deviceId: string) : Promise<string> {
    const device = await this.prisma.device
                            .findUnique({
                              where: { id: deviceId },
                              include: { deviceModel: true }
                            });

    const deviceModel = device!.deviceModel!;
    return deviceModel.dataTypeName;
  }

  public async createDeviceModel(deviceModel: DeviceModel) {
    const foundItens = await this.prisma.deviceModel
                        .findMany({ where: { id: deviceModel.id } });

    if (foundItens.length > 0)
      throw new AlreadyRegisteredError();

    await this.prisma.deviceModel.create({
      data: {
        id: deviceModel.id,
        description: deviceModel.description,
        dataTypeName: deviceModel.schema.name
      }
    });
  }

  public async createDevice(device: Device) {
    const foundItens = await this.prisma.device
                        .findMany({ where: { id: device.id } });

    if (foundItens.length > 0)
      throw new AlreadyRegisteredError();

    await this.prisma.device.create({
      data: {
        id: device.id,
        deviceModelId: device.model.id
      }
    });
  }
}
