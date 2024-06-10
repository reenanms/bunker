import * as sqlPrisma from "../../SQL/prisma/client";
import { DataSchema } from "../entity/DataSchema";
import { SchemaType } from "../entity/SchemaType";
import { DataSchemaTypeObject } from "../entity/DataSchemaTypeObject";
import { DataSchemaTypeArray } from "../entity/DataSchemaTypeArray";
import { DataSchemaTypeBasic } from "../entity/DataSchemaTypeBasic";
import { SchemaBasicType } from "../entity/SchemaBasicType";
import { SchemaRepository } from "../repository/Schema.repository";
import { SchemaMapper } from "../mapper/Schema.mapper";

export class UpdateDataSchemaUseCase {
  private readonly mapper = new SchemaMapper();

  constructor(readonly repository: SchemaRepository) { }

  public run(dataSchema: DataSchema) {
    this.update(dataSchema);
  }

  private update(dataSchema: DataSchema): void {
    this.updateDataType(dataSchema);
    this.updateDefinition(dataSchema);
  }

  private updateDefinition(dataSchema: DataSchema): void {
    switch (dataSchema.type) {
      case SchemaType.OBJECT:
        this.updateDataTypeObject(dataSchema.name, dataSchema.definition as DataSchemaTypeObject[]);
        break;
      case SchemaType.ARRAY:
        this.updateDataTypeArray(dataSchema.name, dataSchema.definition as DataSchemaTypeArray);
        break;
      case SchemaType.BASIC:
        this.updateDataTypeBasic(dataSchema.name, dataSchema.definition as DataSchemaTypeBasic);
        break;
    }
  }

  private updateDataTypeObject(parentDataTypeName: string, definitions: DataSchemaTypeObject[]): void {
    for (const definition of definitions) {
      this.update(definition.propertyDataType);

      const dataTypeObject: sqlPrisma.DataTypeObject = {
        parentDataTypeName,
        propertyDataTypeName: definition.propertyDataType.name,
        propertyName: definition.propertyName,
        regexValidator: definition.regexValidator,
      };

      try {
        this.repository.updateDataTypeObject(dataTypeObject);
      } catch {
        this.repository.createDataTypeObject(dataTypeObject);
      }
    }
  }

  private updateDataTypeArray(parentDataTypeName: string, definition: DataSchemaTypeArray): void {
    this.update(definition.arrayDataType);

    const dataTypeArray: sqlPrisma.DataTypeArray = {
      parentDataTypeName,
      arrayDataTypeName: definition.arrayDataType.name,
    };

    try {
      this.repository.updateDataTypeArray(dataTypeArray);
    } catch {
      this.repository.createDataTypeArray(dataTypeArray);
    }
  }

  private updateDataTypeBasic(parentDataTypeName: string, definition: DataSchemaTypeBasic): void {
    const basicType = this.mapper.schemaBasicTypeEntityToModel(definition.basicType);
    const dataTypeBasic: sqlPrisma.DataTypeBasic = {
      parentDataTypeName,
      basicType,
      regexValidator: definition.regexValidator
    };

    try {
      this.repository.updateDataTypeBasic(dataTypeBasic);
    } catch {
      this.repository.createDataTypeBasic(dataTypeBasic);
    }
  }

  private updateDataType(dataSchema: DataSchema): void {
    const dataTypes = this.mapper.dataTypeEntityToModel(dataSchema.type);
    const dataType: sqlPrisma.DataType = {
      name: dataSchema.name,
      dataType: dataTypes
    };

    try {
      this.repository.updateDataType(dataType);
    } catch {
      this.repository.createDataType(dataType);
    }
  }
}
