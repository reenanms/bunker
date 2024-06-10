import {
  Controller,
  // Param,
  // Post,
  // RawBodyRequest,
  // Req,
  // Request,
  // UnauthorizedException,
  // UseGuards,
} from "@nestjs/common";
//import { AppService } from "./app.service";
//import { AuthGuard } from "../auth.guard";

@Controller("/hello")
export class AppController {
  // constructor(private readonly appService: AppService) {}
  constructor() {}

  // @Post("/")
  // //@UseGuards(AuthGuard)
  // async sendData(
  //   //@Param("DEVICE_ID") deviceId: string,
  //   //@Request() request,
  //   //@Req() req: RawBodyRequest<Request>,
  // ) {
  //   console.log(`BBB: ${this.appService}`);

  // if (request.auth.deviceId != deviceId)
  //   throw new UnauthorizedException(undefined, "Invalid device token");

  // const raw = req.rawBody;
  // const data = raw.toString();
  // const dataToSend = {
  //   deviceId,
  //   data,
  // };
  // await this.appService.sendData(dataToSend);
  //}
}
