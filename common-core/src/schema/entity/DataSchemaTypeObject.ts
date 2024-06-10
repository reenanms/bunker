import { DataSchema } from "./DataSchema";


export type DataSchemaTypeObject = {
  propertyName: string;
  propertyDataType: DataSchema;
  regexValidator: string | null;
};
