import { DataTypeObject } from "../entity/DataTypeObject";
import { BasicType } from "../entity/DataTypeBasic";
import { DataSchema, DataType } from "../entity/DataSchema";


export class DataSchemaFactory {
  static createInteger(): DataSchema {
    return this.createBasic("integer", DataType.BASIC, BasicType.NO_QUOTES, "^[-+]?\\d{1,}$");
  }

  static createFloat(): DataSchema {
    return this.createBasic("float", DataType.BASIC, BasicType.NO_QUOTES, "^[-+]?\\d{1,}[.]{0,1}\\d{0,}$");
  }

  static createBoolean(): DataSchema {
    return this.createBasic("boolean", DataType.BASIC, BasicType.NO_QUOTES, "^(true|false)$");
  }

  static createString(): DataSchema {
    return this.createBasic("string",DataType.BASIC,BasicType.NO_QUOTES,"^.{0,}$");
  }

  static createDate(): DataSchema {
    return this.createBasic(
      "date", DataType.BASIC, BasicType.NO_QUOTES,
      "^[0-9]{4}-((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(02)-(0[1-9]|[12][0-9]))$"
    );
  }

  static createDatetime(): DataSchema {
    return this.createBasic(
      "datetime", DataType.BASIC, BasicType.NO_QUOTES,
      "^[0-9]{4}-((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(02)-(0[1-9]|[12][0-9]))T(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[1-5][0-9]):(0[0-9]|[1-5][0-9])\\.[0-9]{3}$"
    );
  }

  static createBasic(name: string, type: DataType, basicType: BasicType, regexValidator: string): DataSchema {
    return { name, type, definition: { basicType, regexValidator } };
  }

  static createArray(arrayDataType: DataSchema): DataSchema {
    return {
      name: `array-${arrayDataType.name}`,
      type: DataType.ARRAY,
      definition: {
        arrayDataType
      },
    };
  }

  static createSimpleObject(objectName: string, object: Record<string, DataSchema>): DataSchema {
    const objectDefinition = Object.entries(object).map(([propertyName, propertyDataType]) => ({ propertyName, propertyDataType } as DataTypeObject));
    return this.createObject(objectName, objectDefinition);
  }

  static createObject(objectName: string, objectDefinition: DataTypeObject[]): DataSchema {
    return {
      name: objectName,
      type: DataType.OBJECT,
      definition: objectDefinition,
    };
  }
}
