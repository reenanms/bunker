import { PrismaClient as PrismaSQL } from "../../src/SQL/prisma/client";
import { DataSchemaRepository } from "../../src/deviceData/repository/DataSchema.repository";
import { GetDataSchemaUseCase } from "../../src/deviceData/useCase/GetDataSchema.usecase";


describe("deviceData", () => {
  it( `${GetDataSchemaUseCase.name}`, async () => {
      const prisma = new PrismaSQL();
      const repository = new DataSchemaRepository(prisma);
      const useCase = new GetDataSchemaUseCase(repository);

      const schemaName = await useCase
          .run("integer");

      expect(schemaName.name).toBe("integer");
    });
})
