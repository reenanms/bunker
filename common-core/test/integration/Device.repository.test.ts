import { PrismaClient as PrismaSQL } from "../../src/SQL/prisma/client";
import { DeviceRepository } from "../../src/device/repository/Device.repository"
import { DeviceModelRepository } from "../../src/deviceModel/repository/DeviceModel.repository"
import { DataConsistency } from "./DataConsistency";


describe(`${DeviceRepository.name}`, () => {
  it("getDeviceSchemaName", async () => {
      const prisma = new PrismaSQL();
      const deviceRepository = new DeviceRepository(prisma);
      const deviceModelRepository = new DeviceModelRepository(prisma);
      const device = await DataConsistency
        .getDeviceWithIntegerData(deviceRepository, deviceModelRepository);

      const prismaDevice = await deviceRepository
          .read({id:device.id});
      const prismaDeviceModel = await deviceModelRepository
        .read({id:prismaDevice.deviceModelId});
      const schemaName = prismaDeviceModel.dataTypeName;

      expect(schemaName).toBe(device.model.schema.name);
    });
})
