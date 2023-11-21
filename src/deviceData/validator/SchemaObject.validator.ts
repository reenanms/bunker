import { InvalidMatchSchemaError } from "../../basic/error/InvalidMatchSchemaError"
import { DataSchema, DataType } from "../entity/DataSchema"
import { DataTypeArray } from "../entity/DataTypeArray"
import { DataTypeBasic } from "../entity/DataTypeBasic"
import { DataTypeObject } from "../entity/DataTypeObject"


export class SchemaObjectValidator {
  constructor(readonly schema: DataSchema) { }

  public validate(obj: any) {
    this.validateSchema(this.schema, obj);
  }

  private validateSchema(schema: DataSchema, obj: any) {
    switch(schema.type) {
      case DataType.BASIC:
        this.validateBasicType(schema, obj);
        break;
      case DataType.ARRAY:
        this.validateArrayType(schema, obj);
        break;
      case DataType.OBJECT:
        this.validateObjectType(schema, obj);
        break;
      default:
        throw new Error("schema.type not implemented.");
    }
  }

  private validateBasicType(schema: DataSchema, obj: any) {
    if (Array.isArray(obj))
      throw new InvalidMatchSchemaError(schema, obj);

    const dataTypeBasic = schema.definition as DataTypeBasic;
    this.validateObjectMatchRegex(schema, dataTypeBasic.regexValidator, obj);
  }

  private validateObjectMatchRegex(schema: DataSchema, regexString: string | null, obj: any) {
    if (regexString == null)
      return;

    const regEx = new RegExp(regexString);
    if (!regEx.test(obj))
      throw new InvalidMatchSchemaError(schema, obj);
  }

  private validateArrayType(schema: DataSchema, obj: any) {
    if (!Array.isArray(obj))
      throw new InvalidMatchSchemaError(schema, obj);

    const dataTypeBasic = schema.definition as DataTypeArray;
    const arrayItems = obj as any[];

    for (const item of arrayItems)
      this.validateSchema(dataTypeBasic.arrayDataType, item);
  }

  private validateObjectType(schema: DataSchema, obj: any) {
    if (Array.isArray(obj))
      throw new InvalidMatchSchemaError(schema, obj);

    const dataTypeObjects = schema.definition as DataTypeObject[];
    const objectProperties = obj as Record<string, any>;

    this.validadeObjectProperties(dataTypeObjects, objectProperties, schema, obj)
  }

  private validadeObjectProperties(dataTypeObjects: DataTypeObject[], objectProperties: Record<string, any>, schema: DataSchema, obj: any) {
    for (const typeObject of dataTypeObjects) {
      const property = objectProperties[typeObject.propertyName]
      if (property == null)
        throw new InvalidMatchSchemaError(schema, obj)

      this.validateObjectMatchRegex(schema, typeObject.regexValidator, obj)
      this.validateSchema(typeObject.propertyDataType, property)
    }
  }
}
