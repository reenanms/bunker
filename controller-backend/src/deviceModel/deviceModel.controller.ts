import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  Delete,
  Get,
  Put,
  Request
} from "@nestjs/common";
import * as resolver from "common-core/resolver";
import { CreateDeviceModelUseCase } from "common-core/deviceModel/useCase/CreateDeviceModel.usecase";
import { DeleteDeviceModelUseCase } from "common-core/deviceModel/useCase/DeleteDeviceModel.usecase";
import { GetDeviceModelsByNameAndUsernameUseCase } from "common-core/deviceModel/useCase/GetDeviceModelsByNameAndUsername.usecase";
import { GetDeviceModelUseCase } from "common-core/deviceModel/useCase/GetDeviceModel.usecase";
import { UpdateDeviceModelUseCase } from "common-core/deviceModel/useCase/UpdateDeviceModel.usecase";
import { DeviceModel } from "common-core/deviceModel/entity/DeviceModel";
import { AuthGuard } from "../auth.guard";

@UseGuards(AuthGuard)
@Controller("/deviceModel")
export class DeviceModelController {
  constructor() {}

  @Get("/")
  async getAllDeviceModels(@Request() request) {
    const username = request.auth.username;
    
    const userCase = resolver.resolve(GetDeviceModelsByNameAndUsernameUseCase);
    return await userCase.run({ username });
  }

  @Post("/")
  async createDeviceModel(@Request() request, @Body() deviceModel: DeviceModel) {
    deviceModel.username = request.auth.username;

    const userCase = resolver.resolve(CreateDeviceModelUseCase);
    return await userCase.run(deviceModel);
  }

  @Delete("/:ID")
  async deleteDeviceModel(@Param("ID") id: string) {
    const userCase = resolver.resolve(DeleteDeviceModelUseCase);
    await userCase.run({ id });
  }

  @Get("/:ID")
  async getDeviceModel(@Param("ID") id: string): Promise<DeviceModel> {
    const userCase = resolver.resolve(GetDeviceModelUseCase);
    return await userCase.run({ id });
  }

  @Put("/:ID")
  async updateDeviceModel(
    @Param("ID") id: string,
    @Request() request,
    @Body() deviceModel: DeviceModel,
  ) {
    deviceModel.id = id;
    deviceModel.username = request.auth.username;

    const userCase = resolver.resolve(UpdateDeviceModelUseCase);
    return await userCase.run(deviceModel);
  }
}
