import { PrismaClient as PrismaSQL } from "../../src/SQL/prisma/client";
import { PrismaClient as PrismaNoSQL } from "../../src/noSQL/prisma/client";
import { DataSchemaRepository } from "../../src/deviceData/repository/DataSchema.repository";
import { CreateDeviceDataUseCase } from "../../src/deviceData/useCase/CreateDeviceData.usecase"
import { DeviceRepository } from "../../src/deviceData/repository/Device.repository";
import { DeviceDataRepository } from "../../src/deviceData/repository/DeviceData.repository";
import { DataConsistency } from "./DataConsistency";


describe("deviceData", () => {
  it( `${CreateDeviceDataUseCase.name} - int`, async () => {
      const sqlConnection = new PrismaSQL();
      const noSqlConnection = new PrismaNoSQL();
      const deviceRepository = new DeviceRepository(sqlConnection);
      const deviceDataRepository = new DeviceDataRepository(noSqlConnection);
      const dataSchemaRepository = new DataSchemaRepository(sqlConnection);
      const useCase = new CreateDeviceDataUseCase(deviceRepository, deviceDataRepository, dataSchemaRepository);
      const device = await DataConsistency
        .getDeviceWithIntegerData(deviceRepository);
      const deviceData = {
        deviceId: device.id,
        data: 9999
      };
      
      const dataId = await useCase
          .run(deviceData);
      
      expect(dataId).not.toBe("");
    });
})

