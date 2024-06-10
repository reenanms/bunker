import { SchemaBasicType } from "./SchemaBasicType";
import { SchemaType } from "./SchemaType";


export type SchemaWioutDefinition = {
  name: string;
  type: SchemaType;
};

export type Schema = SchemaWioutDefinition & {
  definition: SchemaTypeObject[] | SchemaTypeArray | SchemaTypeBasic;
};

export type SchemaTypeArray = {
  schema: string;
};

export type SchemaTypeBasic = {
  type: SchemaBasicType;
  regexValidator: string;
};

export type SchemaTypeObject = {
  name: string;
  schema: string;
  regexValidator: string | null;
};

