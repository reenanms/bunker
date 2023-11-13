import { PrismaClient } from "../../src/SQL/prisma/client";
import { DataSchemaRepository } from "../../src/deviceData/repository/DataSchema.repository";
import { GetDataSchemaUseCase } from "../../src/deviceData/useCase/GetDataSchema.usecase"


describe(`${GetDataSchemaUseCase.name}`, () => {
  it("getSchema", async () => {
      const prisma = new PrismaClient();
      const repository = new DataSchemaRepository(prisma);
      const useCase = new GetDataSchemaUseCase(repository)

      const schemaName = await useCase
          .run("integer");

      expect(schemaName.name).toBe("integer");
    });
})

