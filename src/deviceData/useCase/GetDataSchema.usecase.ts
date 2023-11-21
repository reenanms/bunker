import { DataTypes, BasicTypes } from "../../SQL/prisma/client";
import { DataSchema, DataType } from "../entity/DataSchema";
import { DataTypeObject } from "../entity/DataTypeObject";
import { DataTypeArray } from "../entity/DataTypeArray";
import { BasicType, DataTypeBasic } from "../entity/DataTypeBasic";
import { DataSchemaRepository } from "../repository/DataSchema.repository";


export class GetDataSchemaUseCase {
  constructor(
    readonly repository: DataSchemaRepository
  ) { }

  public async run(schemaName: string): Promise<DataSchema> {
    return await this.getSchema(schemaName);
  }

  private async getSchema(name: string): Promise<DataSchema> {
    const dataType = await this.repository.getPrismaDataType(name);
    const type = this.getDataType(dataType.dataType);
    const definition = await this.getDefinitions(dataType.dataType, dataType.name);

    return {
      name,
      type,
      definition
    };
  }

  private async getDefinitions(dataType: DataTypes, parentDataTypeName: string): Promise<DataTypeObject[] | DataTypeArray | DataTypeBasic> {
    switch (dataType) {
      case DataTypes.OBJECT:
        return await this.getDataTypeObject(parentDataTypeName);
      case DataTypes.ARRAY:
        return await this.getDataTypeArray(parentDataTypeName);
      case DataTypes.BASIC:
        return await this.getDataTypeBasic(parentDataTypeName);
    }
  }

  private async getDataTypeObject(parentDataTypeName: string): Promise<DataTypeObject[]> {
    const dataTypeProperties = await this.repository.getPrismaDataTypeObject(parentDataTypeName);

    const dataTypeObject: DataTypeObject[] = [];
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

  private async getDataTypeArray(parentDataTypeName: string): Promise<DataTypeArray> {
    const dataTypeArray = await this.repository.getPrismaDataTypeArray(parentDataTypeName);
    const arrayDataType = await this.getSchema(dataTypeArray.arrayDataTypeName);

    return {
      arrayDataType
    };
  }

  private async getDataTypeBasic(parentDataTypeName: string): Promise<DataTypeBasic> {
    const dataTypeBasic = await this.repository.getPrismaDataTypeBasic(parentDataTypeName);

    const basicType = this.getBasicType(dataTypeBasic.basicType);
    return {
      basicType,
      regexValidator: dataTypeBasic.regexValidator
    };
  }

  private getDataType(dataType: DataTypes): DataType {
    switch (dataType) {
      case DataTypes.OBJECT:
        return DataType.OBJECT;
      case DataTypes.ARRAY:
        return DataType.ARRAY;
      case DataTypes.BASIC:
        return DataType.BASIC;
    }
  }

  private getBasicType(basicType: BasicTypes): BasicType {
    switch (basicType) {
      case BasicTypes.NO_QUOTES:
        return BasicType.NO_QUOTES;
      case BasicTypes.QUOTES:
        return BasicType.QUOTES;
    }
  }
}
