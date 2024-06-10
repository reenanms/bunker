import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { GetUserTokenPayloadUseCase } from "common-core/auth/userCase/GetUserTokenPayload.usecase";
import * as resolver from "common-core/resolver";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);

      const getUserTokenPayload = resolver.resolve(GetUserTokenPayloadUseCase);
      const authPayload = await getUserTokenPayload.run(token);

      request["auth"] = authPayload;
      return true;
    } catch {
      throw new UnauthorizedException(undefined, "Invalid token");
    }
  }
}
