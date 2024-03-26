import { PrismaClient as PrismaSQL } from "../../src/SQL/prisma/client";
import { DeviceRepository } from "../../src/deviceData/repository/Device.repository"
import { DataConsistency } from "./DataConsistency";


describe(`${DeviceRepository.name}`, () => {
  it("getDeviceSchemaName", async () => {
      const prisma = new PrismaSQL();
      const repository = new DeviceRepository(prisma);
      const device = await DataConsistency
        .getDeviceWithIntegerData(repository);

      const schemaName = await repository
          .getDeviceSchemaName(device.id);

      expect(schemaName).toBe(device.model.schema.name);
    });
})
