import { DataSchema } from "../../deviceData/entity/DataSchema";
import { BaseError } from "./BaseError";


export class InvalidMatchSchemaError extends BaseError {
  constructor(schema: DataSchema, obj: any) {
    super(`Object (${obj}) do not match with the ${schema.name} schema`);
  }
}
