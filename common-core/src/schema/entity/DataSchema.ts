import { DataSchemaTypeObject } from "./DataSchemaTypeObject";
import { DataSchemaTypeArray } from "./DataSchemaTypeArray";
import { DataSchemaTypeBasic } from "./DataSchemaTypeBasic";
import { SchemaType } from "./SchemaType";


export type DataSchema = {
  name: string;
  type: SchemaType;
  definition: DataSchemaTypeObject[] | DataSchemaTypeArray | DataSchemaTypeBasic;
};
