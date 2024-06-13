import { InvalidMatchSchemaError } from "../../common/error/InvalidMatchSchemaError"
import { DataSchema } from "../entity/DataSchema"
import { SchemaType } from "../entity/SchemaType"
import { DataSchemaTypeArray } from "../entity/DataSchemaTypeArray"
import { DataSchemaTypeBasic } from "../entity/DataSchemaTypeBasic"
import { DataSchemaTypeObject } from "../entity/DataSchemaTypeObject"


export class SchemaObjectValidator {
  constructor(readonly schema: DataSchema) { }

  public validate(obj: any) {
    this.validateSchema(this.schema, obj);
  }

  private validateSchema(schema: DataSchema, obj: any) {
    switch(schema.type) {
      case SchemaType.BASIC:
        this.validateBasicType(schema, obj);
        break;
      case SchemaType.ARRAY:
        this.validateArrayType(schema, obj);
        break;
      case SchemaType.OBJECT:
        this.validateObjectType(schema, obj);
        break;
      default:
        throw new Error("schema.type not implemented.");
    }
  }

  private validateBasicType(schema: DataSchema, obj: any) {
    if (Array.isArray(obj))
      throw new InvalidMatchSchemaError(schema.name, obj);

    const dataTypeBasic = schema.definition as DataSchemaTypeBasic;
    this.validateObjectMatchRegex(schema, dataTypeBasic.regexValidator, obj);
  }

  private validateObjectMatchRegex(schema: DataSchema, regexString: string | null, obj: any) {
    if (regexString == null)
      return;

    const regEx = new RegExp(regexString);
    if (!regEx.test(obj))
      throw new InvalidMatchSchemaError(schema.name, obj);
  }

  private validateArrayType(schema: DataSchema, obj: any) {
    if (!Array.isArray(obj))
      throw new InvalidMatchSchemaError(schema.name, obj);

    const dataTypeBasic = schema.definition as DataSchemaTypeArray;
    const arrayItems = obj as any[];

    for (const item of arrayItems)
      this.validateSchema(dataTypeBasic.arrayDataType, item);
  }

  private validateObjectType(schema: DataSchema, obj: any) {
    if (Array.isArray(obj))
      throw new InvalidMatchSchemaError(schema.name, obj);

    const dataTypeObjects = schema.definition as DataSchemaTypeObject[];
    const objectProperties = obj as Record<string, any>;

    this.validadeObjectProperties(dataTypeObjects, objectProperties, schema, obj)
  }

  private validadeObjectProperties(dataTypeObjects: DataSchemaTypeObject[], objectProperties: Record<string, any>, schema: DataSchema, obj: any) {
    for (const typeObject of dataTypeObjects) {
      const property = objectProperties[typeObject.propertyName]
      if (property == null)
        throw new InvalidMatchSchemaError(schema.name, obj)

      this.validateObjectMatchRegex(schema, typeObject.regexValidator, obj)
      this.validateSchema(typeObject.propertyDataType, property)
    }
  }
}
