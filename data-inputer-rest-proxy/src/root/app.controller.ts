import {
  Controller,
  Param,
  Post,
  Req,
  Request,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { AuthGuard } from "../auth.guard";
import { Auth, AuthService } from "../common/auth/AuthService";
import * as rawbody from "raw-body";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("/:DEVICE_ID/data")
  @UseGuards(AuthGuard)
  async sendData(
    @Param("DEVICE_ID") deviceId: string,
    @Request() request,
    @Req() req,
  ) {
    if (request.auth.deviceId != deviceId)
      throw new UnauthorizedException(undefined, "Invalid device token");

    const raw = await rawbody(req);
    const data = raw.toString();

    const dataToSend = {
      deviceId,
      data,
    };

    await this.appService.sendData(dataToSend);
  }

  @Post("/:DEVICE_ID/token")
  async TMP(@Param("DEVICE_ID") deviceId: string): Promise<Auth> {
    const authService = new AuthService();
    const validatedAuth = await authService.generateDeviceToken(
      "testuser",
      deviceId,
    );

    return validatedAuth;
  }
}
