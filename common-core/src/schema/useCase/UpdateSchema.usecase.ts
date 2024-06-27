import { SchemaRepository } from "../repository/Schema.repository";
import { Schema, SchemaTypeArray, SchemaTypeBasic, SchemaTypeObject } from "../entity/Schema";
import { SchemaMapper } from "../mapper/Schema.mapper";
import { SchemaType } from "../entity/SchemaType";
import model from "../../SQL/prisma/client";

export class UpdateSchemaUseCase {
  private readonly mapper = new SchemaMapper();

  constructor(readonly repository: SchemaRepository) { }

  public async run(schema: Schema): Promise<Schema> {
    const modelSchema = this.mapper.schemaEntityToModel(schema);
    const modelSchemaResult = await this.repository.updateDataType(modelSchema);

    switch (schema.type) {
      case SchemaType.BASIC:
        return await this.updateSchemaTypeBasic(schema, modelSchemaResult);
      case SchemaType.OBJECT:
        return this.updateSchemaTypeObject(schema, modelSchemaResult);
      case SchemaType.ARRAY:
        return this.updateSchemaTypeArray(schema, modelSchemaResult);
    }
  }

  private async updateSchemaTypeBasic(schema: Schema, modelSchemaResult: model.DataType): Promise<Schema> {
    const entitySchemaTypeBasic = schema.definition as SchemaTypeBasic;
    const modelSchemaTypeBasic = this.mapper.schemaTypeBasicEntityToModel(schema, entitySchemaTypeBasic);
    const modelSchemaTypeBasicResult = await this.repository.updateDataTypeBasic(modelSchemaTypeBasic);
    const schemaResult = this.mapper.schemaTypeBasicModelToEntity(modelSchemaResult, modelSchemaTypeBasicResult);
    return schemaResult;
  }

  private async updateSchemaTypeObject(schema: Schema, modelSchemaResult: model.DataType): Promise<Schema> {
    const entitySchemaTypeObject = schema.definition as SchemaTypeObject[];

    const modelCurrentSchemaTypeObject = await this.repository.getDataTypeObjects(modelSchemaResult.name);
    const modelSchemaTypeObject = await this.mapper.schemaTypeObjectEntityToModel(schema, entitySchemaTypeObject);
    
    const modelSchemaTypeObjectToDelete = modelCurrentSchemaTypeObject.filter(e => modelSchemaTypeObject.findIndex(o => o.propertyName == e.propertyName) == -1);
    await this.repository.deleteDataTypeObject(modelSchemaTypeObjectToDelete);

    const modelSchemaTypeObjectToUpdate = modelSchemaTypeObject.filter(e => modelCurrentSchemaTypeObject.findIndex(o => o.propertyName == e.propertyName) != -1);
    const modelSchemaTypeObjectToUpdateResult = await this.repository.updateDataTypeObjects(modelSchemaTypeObjectToUpdate);

    const modelSchemaTypeObjectToCreate = modelSchemaTypeObject.filter(e => modelCurrentSchemaTypeObject.findIndex(o => o.propertyName == e.propertyName) == -1);
    const modelSchemaTypeObjectToCreateResult = await this.repository.createDataTypeObjects(modelSchemaTypeObjectToCreate);

    const modelSchemaTypeObjectResult = [ ...modelSchemaTypeObjectToUpdateResult, ...modelSchemaTypeObjectToCreateResult ];
    const schemaResult = await this.mapper.schemaTypeObjectModelToEntity(modelSchemaResult, modelSchemaTypeObjectResult);

    return schemaResult;
  }

  private async updateSchemaTypeArray(schema: Schema, modelSchemaResult: model.DataType): Promise<Schema> {
    const entitySchemaTypeArray = schema.definition as SchemaTypeArray;
    const modelSchemaTypeArray = this.mapper.schemaTypeArrayEntityToModel(schema, entitySchemaTypeArray);
    const modelSchemaTypeArrayResult = await this.repository.updateDataTypeArray(modelSchemaTypeArray);
    const schemaResult = this.mapper.schemaTypeArrayModelToEntity(modelSchemaResult, modelSchemaTypeArrayResult);
    return schemaResult;
  }
}
