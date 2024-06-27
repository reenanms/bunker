import { BasicTypes, DataTypes } from "../../SQL/prisma/client";
import { SchemaRepository } from "../repository/Schema.repository";
import { DataSchemaField } from "../entity/DataSchemaField";

export class GetDataSchemaFieldsUseCase {
  constructor(readonly repository: SchemaRepository) { }

  public async run(schemaName: string): Promise<DataSchemaField[]> {
    return await this.getFields("$", schemaName, schemaName);
  }

  private async getFields(path: string, schemaPath: string, schemaName: string): Promise<DataSchemaField[]> {
    const dataType = await this.repository.getDataType(schemaName);

    switch(dataType.dataType) {
      case DataTypes.BASIC:
        return await this.getFieldsBasic(path, schemaPath, schemaName);
      case DataTypes.ARRAY:
        return await this.getFieldsArray(path, schemaPath, schemaName);
      case DataTypes.OBJECT:
        return await this.getFieldsObject(path, schemaPath, schemaName);
    }
  }

  private async getFieldsBasic(path: string, schemaPath: string, schemaName: string) {
    const dataTypeBasic = await this.repository.getDataTypeBasic(schemaName);
    
    const field: DataSchemaField = {
      path,
      schemaPath,
      schemaName,
      hasQuotes: dataTypeBasic.basicType == BasicTypes.QUOTES
    };

    let fields: DataSchemaField[] = [];
    fields.push(field)
    return fields;
  }

  private async getFieldsArray(path: string, schemaPath: string, schemaName: string) {
    const dataTypeArray = await this.repository.getDataTypeArray(schemaName);
    const fields = this.getFields(`${path}[:]`, `${schemaPath}[]`, dataTypeArray.arrayDataTypeName);
    return fields;
  }

  private async getFieldsObject(path: string, schemaPath: string, schemaName: string) {
    const dataTypeProperties = await this.repository.getDataTypeObjects(schemaName);

    let fields: DataSchemaField[] = [];
    for (const dataTypeProperty of dataTypeProperties) {
      const propertyFields = await this.getFields(`${path}.${dataTypeProperty.propertyName}`, `${schemaPath} > ${dataTypeProperty.propertyDataTypeName}`, dataTypeProperty.propertyDataTypeName);
      
      fields.push(...propertyFields);
    }

    return fields;
  }
}