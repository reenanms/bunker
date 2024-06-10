import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  Delete,
  Get,
  Put,
} from "@nestjs/common";
import * as resolver from "common-core/resolver";
import { CreateDeviceModelUseCase } from "common-core/deviceModel/useCase/CreateDeviceModel.usecase";
import { DeleteDeviceModelUseCase } from "common-core/deviceModel/useCase/DeleteDeviceModel.usecase";
import { GetAllDeviceModelsUseCase } from "common-core/deviceModel/useCase/GetAllDeviceModels.usecase";
import { GetDeviceModelUseCase } from "common-core/deviceModel/useCase/GetDeviceModel.usecase";
import { UpdateDeviceModelUseCase } from "common-core/deviceModel/useCase/UpdateDeviceModel.usecase";
import { DeviceModel } from "common-core/deviceModel/entity/DeviceModel";
import { AuthGuard } from "../auth.guard";

@UseGuards(AuthGuard)
@Controller("/deviceModel")
export class DeviceModelController {
  constructor() {}

  @Get("/")
  async getAllDeviceModels() {
    const userCase = resolver.resolve(GetAllDeviceModelsUseCase);
    return await userCase.run();
  }

  @Post("/")
  async createDeviceModel(@Body() deviceModel: DeviceModel) {
    const userCase = resolver.resolve(CreateDeviceModelUseCase);
    await userCase.run(deviceModel);
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
    @Body() deviceModel: DeviceModel,
  ) {
    deviceModel.id = id;
    const userCase = resolver.resolve(UpdateDeviceModelUseCase);
    await userCase.run(deviceModel);
  }
}
