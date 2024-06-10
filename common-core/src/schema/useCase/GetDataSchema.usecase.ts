import { DataTypes } from "../../SQL/prisma/client";
import { DataSchema } from "../entity/DataSchema";
import { DataSchemaTypeObject } from "../entity/DataSchemaTypeObject";
import { DataSchemaTypeArray } from "../entity/DataSchemaTypeArray";
import { DataSchemaTypeBasic } from "../entity/DataSchemaTypeBasic";
import { SchemaRepository } from "../repository/Schema.repository";
import { SchemaMapper } from "../mapper/Schema.mapper";

export class GetDataSchemaUseCase {
  private readonly mapper = new SchemaMapper();

  constructor(readonly repository: SchemaRepository) { }

  public async run(schemaName: string): Promise<DataSchema> {
    return await this.getSchema(schemaName);
  }

  private async getSchema(name: string): Promise<DataSchema> {
    const dataType = await this.repository.getDataType(name);
    
    const type = this.mapper.dataTypeModelToEntity(dataType.dataType);
    const definition = await this.getDefinitions(dataType.dataType, dataType.name);
    return {
      name,
      type,
      definition
    };
  }

  private async getDefinitions(dataType: DataTypes, parentDataTypeName: string): Promise<DataSchemaTypeObject[] | DataSchemaTypeArray | DataSchemaTypeBasic> {
    switch (dataType) {
      case DataTypes.OBJECT:
        return await this.getDataTypeObject(parentDataTypeName);
      case DataTypes.ARRAY:
        return await this.getDataTypeArray(parentDataTypeName);
      case DataTypes.BASIC:
        return await this.getDataTypeBasic(parentDataTypeName);
    }
  }

  private async getDataTypeObject(parentDataTypeName: string): Promise<DataSchemaTypeObject[]> {
    const dataTypeProperties = await this.repository.getDataTypeObjects(parentDataTypeName);

    const dataTypeObject: DataSchemaTypeObject[] = [];
    for (const dataTypeProperty of dataTypeProperties) {
      const propertyDataType = await this.getSchema(dataTypeProperty.propertyDataTypeName);

      dataTypeObject.push({
        propertyName: dataTypeProperty.propertyName,
        propertyDataType,
        regexValidator: dataTypeProperty.regexValidator
      });
    }

    return dataTypeObject;
  }

  private async getDataTypeArray(parentDataTypeName: string): Promise<DataSchemaTypeArray> {
    const dataTypeArray = await this.repository.getDataTypeArray(parentDataTypeName);

    const arrayDataType = await this.getSchema(dataTypeArray.arrayDataTypeName);
    return {
      arrayDataType
    };
  }

  private async getDataTypeBasic(parentDataTypeName: string): Promise<DataSchemaTypeBasic> {
    const dataTypeBasic = await this.repository.getDataTypeBasic(parentDataTypeName);

    const basicType = this.mapper.schemaBasicTypeModelToEntity(dataTypeBasic.basicType);
    return {
      basicType,
      regexValidator: dataTypeBasic.regexValidator
    };
  }
}
