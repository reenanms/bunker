import { SchemaObjectValidator } from "../../../src/schema/validator/SchemaObject.validator"
import { InvalidMatchSchemaError } from "../../../src/common/error/InvalidMatchSchemaError"
import { DataSchemaFactory } from "../../../src/schema/factory/DataSchema.factory"


describe(`${SchemaObjectValidator.name} - DataType.BASIC`, () => {
  const validCases = [
    { schema: DataSchemaFactory.createInteger(), objectToValidate: -9999 },
    { schema: DataSchemaFactory.createInteger(), objectToValidate: 0 },
    { schema: DataSchemaFactory.createInteger(), objectToValidate: 99999 },
    { schema: DataSchemaFactory.createInteger(), objectToValidate: +99999 },

    { schema: DataSchemaFactory.createBoolean(), objectToValidate: true },
    { schema: DataSchemaFactory.createBoolean(), objectToValidate: false },

    { schema: DataSchemaFactory.createFloat(), objectToValidate: -1.1 },
    { schema: DataSchemaFactory.createFloat(), objectToValidate: -1 },
    { schema: DataSchemaFactory.createFloat(), objectToValidate: 0 },
    { schema: DataSchemaFactory.createFloat(), objectToValidate: 1 },
    { schema: DataSchemaFactory.createFloat(), objectToValidate: 1.1 },
    { schema: DataSchemaFactory.createFloat(), objectToValidate: +1.1 },

    { schema: DataSchemaFactory.createDate(), objectToValidate: "9999-12-31" },
    { schema: DataSchemaFactory.createDate(), objectToValidate: "6666-06-20" },
    { schema: DataSchemaFactory.createDate(), objectToValidate: "0001-01-01" },

    { schema: DataSchemaFactory.createDatetime(), objectToValidate: "9999-12-31T23:59:59.999" },
    { schema: DataSchemaFactory.createDatetime(), objectToValidate: "0001-01-01T00:00:00.000" },
  ];

  const invalidCases = [
    { schema: DataSchemaFactory.createInteger(), objectToValidate: true },
    { schema: DataSchemaFactory.createInteger(), objectToValidate: 9.99 },
    { schema: DataSchemaFactory.createInteger(), objectToValidate: "9,999" },
    { schema: DataSchemaFactory.createInteger(), objectToValidate: "9.0" },
    { schema: DataSchemaFactory.createInteger(), objectToValidate: {} },
    { schema: DataSchemaFactory.createInteger(), objectToValidate: [] },
    { schema: DataSchemaFactory.createInteger(), objectToValidate: "abc" },

    { schema: DataSchemaFactory.createBoolean(), objectToValidate: 0 },
    { schema: DataSchemaFactory.createBoolean(), objectToValidate: 1 },
    { schema: DataSchemaFactory.createBoolean(), objectToValidate: [ false ] },
    
    { schema: DataSchemaFactory.createFloat(), objectToValidate: "-1,0000.01" },
    { schema: DataSchemaFactory.createFloat(), objectToValidate: "+1,0000.01" },

    
    { schema: DataSchemaFactory.createDatetime(), objectToValidate: "31/12/9999T23:59:59.999" },
    { schema: DataSchemaFactory.createDatetime(), objectToValidate: "12/31/9999T23:59:59.999" },
  ];
  
  test.each(validCases)(
    "schema: $schema.name, input: $objectToValidate (valid)",
    data => {
      const validate = () => new SchemaObjectValidator(data.schema)
                              .validate(data.objectToValidate);

      expect(validate).not.toThrow();
    }
  )

  test.each(invalidCases)(
    "schema: $schema.name, input: $objectToValidate (invalid)",
    data => {
      const validate = () => new SchemaObjectValidator(data.schema)
                              .validate(data.objectToValidate);

      expect(validate).toThrow(InvalidMatchSchemaError);
    }
  )
});


describe(`${SchemaObjectValidator.name} - DataType.ARRAY`, () => {
  const validCases = [
    { schema: DataSchemaFactory.createArray(DataSchemaFactory.createBoolean()), objectToValidate: [true, false, true] },
  ];

  const invalidCases = [
    { schema: DataSchemaFactory.createArray(DataSchemaFactory.createBoolean()), objectToValidate: 1 },
    { schema: DataSchemaFactory.createArray(DataSchemaFactory.createBoolean()), objectToValidate: [1, 0, 1] },
    { schema: DataSchemaFactory.createArray(DataSchemaFactory.createBoolean()), objectToValidate: [true, 0, true] },
    { schema: DataSchemaFactory.createArray(DataSchemaFactory.createBoolean()), objectToValidate: [true, [false], true] },
  ];
  
  test.each(validCases)(
    "schema: $schema.name, input: $objectToValidate (valid)",
    data => {
      const validate = () => new SchemaObjectValidator(data.schema)
                              .validate(data.objectToValidate);

      expect(validate).not.toThrow();
    }
  )

  test.each(invalidCases)(
    "schema: $schema.name, input: $objectToValidate (invalid)",
    data => {
      const validate = () => new SchemaObjectValidator(data.schema)
                              .validate(data.objectToValidate);

      expect(validate).toThrow(InvalidMatchSchemaError);
    }
  )
});


describe(`${SchemaObjectValidator.name} - DataType.OBJECT`, () => {
  function getValidCase1() {
    const typeInt = DataSchemaFactory.createInteger();
    const schema = DataSchemaFactory.createSimpleObject("simple", { typeInt });

    const objectToValidate = { typeInt: 9 };

    return { schema, objectToValidate };
  }

  function getValidCase2() {
    const typeFloat = DataSchemaFactory.createFloat();
    const schema = DataSchemaFactory.createSimpleObject("simple", { typeFloat });

    const objectToValidate = { typeFloat: 9.99 };

    return { schema, objectToValidate };
  }

  function getValidCase3() {
    const typeFloat = DataSchemaFactory.createFloat();
    const typeArrayFloat = DataSchemaFactory.createArray(typeFloat);
    const schema = DataSchemaFactory.createSimpleObject("simple", { typeArrayFloat });

    const objectToValidate = { typeArrayFloat: [9.99, 0, 6.8] };

    return { schema, objectToValidate };
  }


  const validCases = [
    getValidCase1(),
    getValidCase2(),
    getValidCase3(),
  ];

  function getInvalidCase1() {
    const propInt = DataSchemaFactory.createInteger();
    const schema = DataSchemaFactory.createSimpleObject("simple", { propInt });

    const objectToValidate = { propInt: "abc" };

    return { schema, objectToValidate };
  }


  const invalidCases = [
    getInvalidCase1(),
  ];
  
  test.each(validCases)(
    "schema: $schema.name, input: $objectToValidate (valid)",
    data => {
      const validate = () => new SchemaObjectValidator(data.schema)
                              .validate(data.objectToValidate);

      expect(validate).not.toThrow();
    }
  )

  test.each(invalidCases)(
    "schema: $schema.name, input: $objectToValidate (invalid)",
    data => {
      const validate = () => new SchemaObjectValidator(data.schema)
                              .validate(data.objectToValidate);

      expect(validate).toThrow(InvalidMatchSchemaError);
    }
  )
});
