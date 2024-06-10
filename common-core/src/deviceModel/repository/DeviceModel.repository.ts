

import { PrismaClient as PrismaSQL, DeviceModel } from "../../SQL/prisma/client";
import { GenericCRUDRepository } from "../../common/repository/GenericCRUD.repository";

export type DeviceModelKey = {
  id: string
};

export class DeviceModelRepository extends GenericCRUDRepository<DeviceModel, DeviceModelKey> {
  constructor(readonly prisma: PrismaSQL) {
    super(prisma);
  }

  protected getKey(data: DeviceModel): DeviceModelKey {
    return { id: data.id };
  }
  
  protected getPrismaDelegate() {
    return this.prisma.deviceModel;
  }
}

// export class DeviceModelRepository {
//   constructor(readonly prisma: PrismaSQL) { }

//   public async createDeviceModel(deviceModel: DeviceModel) {
//     const foundItens = await this.prisma.deviceModel
//                         .findMany({ where: { id: deviceModel.id } });

//     if (foundItens.length > 0)
//       throw new AlreadyRegisteredError();

//     await this.prisma.deviceModel.create({
//       data: deviceModel
//     });
//   }

//   public async readDeviceModel(deviceId: string) : Promise<string> {
//     const device = await this.prisma.device
//                             .findUniqueOrThrow({
//                               where: { id: deviceId },
//                               include: { deviceModel: true }
//                             });

//     const deviceModel = device!.deviceModel!;
//     return deviceModel.dataTypeName;
//   }

//   public async getDeviceSchemaName(deviceId: string) : Promise<string> {
//     const device = await this.prisma.device
//                             .findUniqueOrThrow({
//                               where: { id: deviceId },
//                               include: { deviceModel: true }
//                             });

//     const deviceModel = device!.deviceModel!;
//     return deviceModel.dataTypeName;
//   }

  

// }
