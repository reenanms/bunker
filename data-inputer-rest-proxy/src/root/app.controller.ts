import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import getRawBody from "raw-body";
import { AuthGuard } from "../auth.guard";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("/data")
  @UseGuards(AuthGuard)
  async sendData(@Req() request) {
    const raw = await getRawBody(request);

    const deviceId = request.auth.deviceId;
    const data = raw.toString();

    const dataToSend = {
      deviceId,
      data,
    };

    await this.appService.sendData(dataToSend);
  }
}
