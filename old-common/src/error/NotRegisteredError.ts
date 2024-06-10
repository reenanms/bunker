import { BaseError } from "./BaseError";

export class NotRegisteredError extends BaseError {
  constructor() {
    super(`Not registered item`);
  }
}
