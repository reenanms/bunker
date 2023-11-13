import { PrismaClient } from "../../src/SQL/prisma/client";
import { DeviceRepository } from "../../src/deviceData/repository/Device.repository"
import { DataSchemaFactory } from "../../src/deviceData/factory/DataSchema.factory";
import { DeviceFactory } from "../../src/deviceData/factory/Device.factory";


describe(`${DeviceRepository.name}`, () => {
  it("getDeviceSchemaName", async () => {
      const prisma = new PrismaClient();
      const repository = new DeviceRepository(prisma);
      const device = await getDevice(repository);

      const schemaName = await repository
          .getDeviceSchemaName(device.id);

      expect(schemaName).toBe(device.model.schema.name);
    });
})

async function getDevice(deviceRepository: DeviceRepository) {
  const integerScheme = DataSchemaFactory.createInteger();
  const deviceModel = DeviceFactory.createDeviceModel("deviceModelTest", "deviceModelTest", integerScheme);
  const device = DeviceFactory.createDevice("deviceTest", deviceModel);

  try {
    await deviceRepository.createDeviceModel(device.model);
    await deviceRepository.createDevice(device);
  } catch {
  }

  return device;
}

