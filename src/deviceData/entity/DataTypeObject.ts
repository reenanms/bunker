import { DataSchema } from "./DataSchema";


export type DataTypeObject = {
  propertyName: string;
  propertyDataType: DataSchema;
  regexValidator: string | null;
};
