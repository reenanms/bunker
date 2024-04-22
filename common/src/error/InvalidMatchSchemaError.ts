import { BaseError } from "./BaseError";

export class InvalidMatchSchemaError extends BaseError {
  constructor(schemaName: string, obj: any) {
    super(`Object (${obj}) do not match with the ${schemaName} schema`);
  }
}
