import { SchemaRepository } from "../repository/Schema.repository";
import { Schema, SchemaTypeArray, SchemaTypeBasic, SchemaTypeObject } from "../entity/Schema";
import { SchemaMapper } from "../mapper/Schema.mapper";
import { SchemaType } from "../entity/SchemaType";
import model from "../../SQL/prisma/client";

export class CreateSchemaUseCase {
  private readonly mapper = new SchemaMapper();
  
  constructor(readonly repository: SchemaRepository) { }

  public async run(schema: Schema): Promise<Schema> {
    const modelSchema = this.mapper.schemaEntityToModel(schema);
    const modelSchemaResult = await this.repository.createDataType(modelSchema);

    switch (schema.type) {
      case SchemaType.BASIC:
          return await this.createSchemaTypeBasic(schema, modelSchemaResult);
      case SchemaType.OBJECT:
        return this.createSchemaTypeObject(schema, modelSchemaResult);
      case SchemaType.ARRAY:
        return this.createSchemaTypeArray(schema, modelSchemaResult);
    }
  }

  private async createSchemaTypeBasic(schema: Schema, modelSchemaResult: model.DataType) : Promise<Schema> {
    const entitySchemaTypeBasic = schema.definition as SchemaTypeBasic;
    const modelSchemaTypeBasic = this.mapper.schemaTypeBasicEntityToModel(schema, entitySchemaTypeBasic);
    const modelSchemaTypeBasicResult = await this.repository.createDataTypeBasic(modelSchemaTypeBasic);
    const schemaResult = this.mapper.schemaTypeBasicModelToEntity(modelSchemaResult, modelSchemaTypeBasicResult);
    return schemaResult;
  }

  private async createSchemaTypeObject(schema: Schema, modelSchemaResult: model.DataType) : Promise<Schema> {
    const entitySchemaTypeObject = schema.definition as SchemaTypeObject[];
    const modelSchemaTypeObject = await this.mapper.schemaTypeObjectEntityToModel(schema, entitySchemaTypeObject);
    const modelSchemaTypeObjectResult = await this.repository.createDataTypeObjects(modelSchemaTypeObject);
    const schemaResult = await this.mapper.schemaTypeObjectModelToEntity(modelSchemaResult, modelSchemaTypeObjectResult);
    return schemaResult;
  }

  private async createSchemaTypeArray(schema: Schema, modelSchemaResult: model.DataType) : Promise<Schema> {
    const entitySchemaTypeArray = schema.definition as SchemaTypeArray;
    const modelSchemaTypeArray = this.mapper.schemaTypeArrayEntityToModel(schema, entitySchemaTypeArray);
    const modelSchemaTypeArrayResult = await this.repository.createDataTypeArray(modelSchemaTypeArray);
    const schemaResult = this.mapper.schemaTypeArrayModelToEntity(modelSchemaResult, modelSchemaTypeArrayResult);
    return schemaResult;
  }
}
