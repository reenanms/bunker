import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  Request,
  Put,
} from "@nestjs/common";
import { UserLogin } from "common-core/auth/entity/UserLogin";
import { DeviceToken } from "common-core/auth/entity/DeviceToken";
import { UserToken } from "common-core/auth/entity/UserToken";
import * as resolver from "common-core/resolver";
import { GenerateUserTokenUseCase } from "common-core/auth/userCase/GenerateUserToken.usecase";
import { GenerateDeviceTokenUseCase } from "common-core/auth/userCase/GenerateDeviceToken.usecase";
import { RefreshUserTokenUseCase } from "common-core/auth/userCase/RefreshUserToken.usecase";
import { AuthGuard } from "../auth.guard";

@Controller("/auth")
export class AuthController {
  constructor() {}

  @Post("/")
  async generateUserToken(@Body() login: UserLogin): Promise<UserToken> {
    const userCase = resolver.resolve(GenerateUserTokenUseCase);
    const result = await userCase.run(login);
    return result;
  }

  @UseGuards(AuthGuard)
  @Put("/refresh")
  async refreshUserToken(@Request() request): Promise<UserToken> {
    const userCase = resolver.resolve(RefreshUserTokenUseCase);
    const result = await userCase.run(request.auth.token);
    return result;
  }

  @UseGuards(AuthGuard)
  @Post("/:DEVICE_ID")
  async generateDeviceToken(
    @Param("DEVICE_ID") deviceId: string,
    @Request() request,
  ): Promise<DeviceToken> {
    const login = {
      username: request.auth.username,
      deviceId,
    };

    const userCase = resolver.resolve(GenerateDeviceTokenUseCase);
    const result = await userCase.run(login);
    return result;
  }
}
