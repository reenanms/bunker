import { BaseError } from "./BaseError";

export class AlreadyRegisteredError extends BaseError {
  constructor() {
    super(`Already registered item`);
  }
}
