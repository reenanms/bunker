import { DataSchemaTypeObject } from "../entity/DataSchemaTypeObject";
import { SchemaBasicType } from "../entity/SchemaBasicType";
import { DataSchema } from "../entity/DataSchema";
import { SchemaType } from "../entity/SchemaType";


export class DataSchemaFactory {
  static createInteger(): DataSchema {
    return this.createBasic("integer", SchemaType.BASIC, SchemaBasicType.NO_QUOTES, "^[-+]?\\d{1,}$");
  }

  static createFloat(): DataSchema {
    return this.createBasic("float", SchemaType.BASIC, SchemaBasicType.NO_QUOTES, "^[-+]?\\d{1,}[.]{0,1}\\d{0,}$");
  }

  static createBoolean(): DataSchema {
    return this.createBasic("boolean", SchemaType.BASIC, SchemaBasicType.NO_QUOTES, "^(true|false)$");
  }

  static createString(): DataSchema {
    return this.createBasic("string",SchemaType.BASIC,SchemaBasicType.NO_QUOTES,"^.{0,}$");
  }

  static createDate(): DataSchema {
    return this.createBasic(
      "date", SchemaType.BASIC, SchemaBasicType.NO_QUOTES,
      "^[0-9]{4}-((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(02)-(0[1-9]|[12][0-9]))$"
    );
  }

  static createDatetime(): DataSchema {
    return this.createBasic(
      "datetime", SchemaType.BASIC, SchemaBasicType.NO_QUOTES,
      "^[0-9]{4}-((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(02)-(0[1-9]|[12][0-9]))T(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[1-5][0-9]):(0[0-9]|[1-5][0-9])\\.[0-9]{3}$"
    );
  }

  static createBasic(name: string, type: SchemaType, basicType: SchemaBasicType, regexValidator: string): DataSchema {
    return { name, type, definition: { basicType, regexValidator } };
  }

  static createArray(arrayDataType: DataSchema): DataSchema {
    return {
      name: `array-${arrayDataType.name}`,
      type: SchemaType.ARRAY,
      definition: {
        arrayDataType
      },
    };
  }

  static createSimpleObject(objectName: string, object: Record<string, DataSchema>): DataSchema {
    const objectDefinition = Object.entries(object).map(([propertyName, propertyDataType]) => ({ propertyName, propertyDataType } as DataSchemaTypeObject));
    return this.createObject(objectName, objectDefinition);
  }

  static createObject(objectName: string, objectDefinition: DataSchemaTypeObject[]): DataSchema {
    return {
      name: objectName,
      type: SchemaType.OBJECT,
      definition: objectDefinition,
    };
  }
}
