import { SchemaRepository } from "../repository/Schema.repository";
import { Schema } from "../entity/Schema";
import { SchemaMapper } from "../mapper/Schema.mapper";
import model, { DataTypes as ModelDataTypes } from "../../SQL/prisma/client";

export class GetSchemaUseCase {
  private readonly mapper = new SchemaMapper();

  constructor(readonly repository: SchemaRepository) { }

  public async run(schemaName: string): Promise<Schema> {
    const modelSchemaResult = await this.repository.getDataType(schemaName);

    switch (modelSchemaResult.dataType) {
      case ModelDataTypes.BASIC:
        return await this.getSchemaTypeBasic(schemaName, modelSchemaResult);
      case ModelDataTypes.OBJECT:
        return this.getSchemaTypeObject(schemaName, modelSchemaResult);
      case ModelDataTypes.ARRAY:
        return this.getSchemaTypeArray(schemaName, modelSchemaResult);
    }
  }

  private async getSchemaTypeBasic(schemaName: string, modelSchemaResult: model.DataType): Promise<Schema> {
    const modelSchemaTypeBasicResult = await this.repository.getDataTypeBasic(schemaName);
    const schemaResult = this.mapper.schemaTypeBasicModelToEntity(modelSchemaResult, modelSchemaTypeBasicResult);
    return schemaResult;
  }

  private async getSchemaTypeObject(schemaName: string, modelSchemaResult: model.DataType): Promise<Schema> {
    const modelSchemaTypeObjectResult = await this.repository.getDataTypeObjects(schemaName);
    const schemaResult = await this.mapper.schemaTypeObjectModelToEntity(modelSchemaResult, modelSchemaTypeObjectResult);
    return schemaResult;
  }

  private async getSchemaTypeArray(schemaName: string, modelSchemaResult: model.DataType): Promise<Schema> {
    const modelSchemaTypeArrayResult = await this.repository.getDataTypeArray(schemaName);
    const schemaResult = this.mapper.schemaTypeArrayModelToEntity(modelSchemaResult, modelSchemaTypeArrayResult);
    return schemaResult;
  }
}
