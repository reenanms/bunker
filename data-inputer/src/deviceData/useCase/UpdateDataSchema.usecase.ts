import prisma from "../../SQL/prisma/client";
import { DataSchema, DataType } from "../entity/DataSchema";
import { DataTypeObject } from "../entity/DataTypeObject";
import { DataTypeArray } from "../entity/DataTypeArray";
import { BasicType, DataTypeBasic } from "../entity/DataTypeBasic";
import { DataSchemaRepository } from "../repository/DataSchema.repository";


export class UpdateDataSchemaUseCase {
  constructor(
    readonly repository: DataSchemaRepository
  ) { }

  public run(dataSchema: DataSchema) {
    this.update(dataSchema);
  }

  private update(dataSchema: DataSchema): void {
    this.updateDataType(dataSchema);
    this.updateDefinition(dataSchema);
  }

  private updateDefinition(dataSchema: DataSchema): void {
    switch (dataSchema.type) {
      case DataType.OBJECT:
        this.updateDataTypeObject(dataSchema.name, dataSchema.definition as DataTypeObject[]);
        break;
      case DataType.ARRAY:
        this.updateDataTypeArray(dataSchema.name, dataSchema.definition as DataTypeArray);
        break;
      case DataType.BASIC:
        this.updateDataTypeBasic(dataSchema.name, dataSchema.definition as DataTypeBasic);
        break;
    }
  }

  private updateDataTypeObject(parentDataTypeName: string, definitions: DataTypeObject[]): void {
    for (const definition of definitions) {
      this.update(definition.propertyDataType);

      const dataTypeObject: prisma.DataTypeObject = {
        parentDataTypeName,
        propertyDataTypeName: definition.propertyDataType.name,
        propertyName: definition.propertyName,
        regexValidator: definition.regexValidator,
      };

      try {
        this.repository.updatePrismaDataTypeObject(dataTypeObject);
      } catch {
        this.repository.createPrismaDataTypeObject(dataTypeObject);
      }
    }
  }

  private updateDataTypeArray(parentDataTypeName: string, definition: DataTypeArray): void {
    this.update(definition.arrayDataType);

    const dataTypeArray: prisma.DataTypeArray = {
      parentDataTypeName,
      arrayDataTypeName: definition.arrayDataType.name,
    };

    try {
      this.repository.updatePrismaDataTypeArray(dataTypeArray);
    } catch {
      this.repository.createPrismaDataTypeArray(dataTypeArray);
    }
  }

  private updateDataTypeBasic(parentDataTypeName: string, definition: DataTypeBasic): void {
    const basicType = this.getBasicType(definition.basicType);
    const dataTypeBasic: prisma.DataTypeBasic = {
      parentDataTypeName,
      basicType,
      regexValidator: definition.regexValidator
    };

    try {
      this.repository.updatePrismaDataTypeBasic(dataTypeBasic);
    } catch {
      this.repository.createPrismaDataTypeBasic(dataTypeBasic);
    }
  }

  private updateDataType(dataSchema: DataSchema): void {
    const dataTypes = this.getDataTypes(dataSchema.type);
    const dataType: prisma.DataType = {
      name: dataSchema.name,
      dataType: dataTypes
    };

    try {
      this.repository.updatePrismaDataType(dataType);
    } catch {
      this.repository.createPrismaDataType(dataType);
    }
  }

  private getDataTypes(dataType: DataType): prisma.DataTypes {
    switch (dataType) {
      case DataType.OBJECT:
        return prisma.DataTypes.OBJECT;
      case DataType.ARRAY:
        return prisma.DataTypes.ARRAY;
      case DataType.BASIC:
        return prisma.DataTypes.BASIC;
    }
  }

  private getBasicType(basicType: BasicType): prisma.BasicTypes {
    switch (basicType) {
      case BasicType.NO_QUOTES:
        return prisma.BasicTypes.NO_QUOTES;
      case BasicType.QUOTES:
        return prisma.BasicTypes.QUOTES;
    }
  }
}
