import { DataTypeObject } from "./DataTypeObject";
import { DataTypeArray } from "./DataTypeArray";
import { DataTypeBasic } from "./DataTypeBasic";


export enum DataType {
  OBJECT,
  ARRAY,
  BASIC
}

export type DataSchema = {
  name: string;
  type: DataType;
  definition: DataTypeObject[] | DataTypeArray | DataTypeBasic;
};
