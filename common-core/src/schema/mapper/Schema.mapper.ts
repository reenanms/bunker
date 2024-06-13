import model, { DataTypes as ModelDataTypes, BasicTypes as ModelBasicTypes } from "../../SQL/prisma/client";
import { SchemaType } from "../entity/SchemaType";
import { SchemaBasicType } from "../entity/SchemaBasicType";
import { Schema, SchemaTypeArray, SchemaTypeBasic, SchemaTypeObject, SchemaWioutDefinition } from "../entity/Schema";

export class SchemaMapper // implements ModelEntityMapper<ModelDeviceModel, DeviceModel>
{
  public schemaEntityToModel(schema: SchemaWioutDefinition) : model.DataType {
    const dataType = this.dataTypeEntityToModel(schema.type);
    
    return {
      name: schema.name,
      dataType
    };
  }

  public schemaModelToEntity(modelSchema: model.DataType): SchemaWioutDefinition {
    const type = this.dataTypeModelToEntity(modelSchema.dataType);

    return {
      name: modelSchema.name,
      type
    };
  }

  public schemaTypeArrayEntityToModel(entitySchema: SchemaWioutDefinition, entityArray: SchemaTypeArray) : model.DataTypeArray {
    return {
      parentDataTypeName: entitySchema.name,
      arrayDataTypeName: entityArray.schema
    };
  }

  public schemaTypeArrayModelToEntity(modelSchema: model.DataType, modelArray: model.DataTypeArray) : Schema {
    const definition: SchemaTypeArray = {
      schema: modelArray.arrayDataTypeName,
    };
    
    const entitySchema : Schema = {
      name: modelSchema.name,
      type: SchemaType.ARRAY,
      definition
    };

    return entitySchema;
  }

  public schemaTypeBasicEntityToModel(entitySchema: Schema, entityBasic: SchemaTypeBasic) : model.DataTypeBasic {
    const basicType = this.schemaBasicTypeEntityToModel(entityBasic.type);
    
    return {
      parentDataTypeName: entitySchema.name,
      basicType,
      regexValidator: entityBasic.regexValidator
    };
  }

  public schemaTypeBasicModelToEntity(modelSchema: model.DataType, modelBasic: model.DataTypeBasic) : Schema {
    const type = this.schemaBasicTypeModelToEntity(modelBasic.basicType);

    const definition: SchemaTypeBasic = {
      type,
      regexValidator: modelBasic.regexValidator,
    };
    
    const entitySchema : Schema = {
      name: modelSchema.name,
      type: SchemaType.BASIC,
      definition
    };

    return entitySchema;
  }

  public schemaTypeObjectEntityToModel(entitySchema: Schema, entityObject: SchemaTypeObject[]) : model.DataTypeObject[] {
    let modelObject : model.DataTypeObject[] = [];
    
    for (const entityProperty of entityObject) {
      const modelPropery : model.DataTypeObject = {
        parentDataTypeName: entitySchema.name,
        propertyName: entityProperty.name,
        propertyDataTypeName: entityProperty.schema,
        regexValidator: entityProperty.regexValidator
      };

      modelObject.push(modelPropery);
    }

    return modelObject;
  }

  public schemaTypeObjectModelToEntity(modelSchema: model.DataType, modelObject: model.DataTypeObject[]) : Schema {
    const definition: SchemaTypeObject[] = [];

    for (const modelProperty of modelObject) {
      const entityPropery : SchemaTypeObject = {
        name: modelProperty.propertyName,
        schema: modelProperty.propertyDataTypeName,
        regexValidator: modelProperty.regexValidator
      };

      definition.push(entityPropery);
    }
    
    const entitySchema : Schema = {
      name: modelSchema.name,
      type: SchemaType.OBJECT,
      definition
    };

    return entitySchema;
  }

  public dataTypeModelToEntity(dataType: model.DataTypes): SchemaType {
    switch (dataType) {
      case ModelDataTypes.OBJECT:
        return SchemaType.OBJECT;
      case ModelDataTypes.ARRAY:
        return SchemaType.ARRAY;
      case ModelDataTypes.BASIC:
        return SchemaType.BASIC;
    }
  }

  public dataTypeEntityToModel(dataType: SchemaType): model.DataTypes {
    switch (dataType) {
      case SchemaType.OBJECT:
        return ModelDataTypes.OBJECT;
      case SchemaType.ARRAY:
        return ModelDataTypes.ARRAY;
      case SchemaType.BASIC:
        return ModelDataTypes.BASIC;
    }
  }

  public schemaBasicTypeModelToEntity(basicType: model.BasicTypes): SchemaBasicType {
    switch (basicType) {
      case ModelBasicTypes.NO_QUOTES:
        return SchemaBasicType.NO_QUOTES;
      case ModelBasicTypes.QUOTES:
        return SchemaBasicType.QUOTES;
    }
  }

  public schemaBasicTypeEntityToModel(basicType: SchemaBasicType): model.BasicTypes {
    switch (basicType) {
      case SchemaBasicType.NO_QUOTES:
        return ModelBasicTypes.NO_QUOTES;
      case SchemaBasicType.QUOTES:
        return ModelBasicTypes.QUOTES;
    }
  }
}
