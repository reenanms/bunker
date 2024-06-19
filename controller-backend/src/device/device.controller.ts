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
import { CreateDeviceUseCase } from "common-core/device/useCase/CreateDevice.usecase";
import { DeleteDeviceUseCase } from "common-core/device/useCase/DeleteDevice.usecase";
import { GetAllDevicesUseCase } from "common-core/device/useCase/GetAllDevices.usecase";
import { GetDeviceUseCase } from "common-core/device/useCase/GetDevice.usecase";
import { UpdateDeviceUseCase } from "common-core/device/useCase/UpdateDevice.usecase";
import { GetDeviceDataUseCase } from "common-core/deviceData/useCase/GetDeviceData.usecase"
import { Device } from "common-core/device/entity/Device";
import { AuthGuard } from "../auth.guard";

@UseGuards(AuthGuard)
@Controller("/device")
export class DeviceController {
  constructor() {}

  @Get("/")
  async getAllDevices() {
    const userCase = resolver.resolve(GetAllDevicesUseCase);
    return await userCase.run();
  }

  @Post("/")
  async createDevice(@Body() device: Device) {
    const userCase = resolver.resolve(CreateDeviceUseCase);
    return await userCase.run(device);
  }

  @Delete("/:ID")
  async deleteDevice(@Param("ID") id: string) {
    const userCase = resolver.resolve(DeleteDeviceUseCase);
    await userCase.run({ id });
  }

  @Get("/:ID")
  async getDevice(@Param("ID") id: string): Promise<Device> {
    const userCase = resolver.resolve(GetDeviceUseCase);
    return await userCase.run({ id });
  }

  @Put("/:ID")
  async updateDevice(@Param("ID") id: string, @Body() device: Device) {
    device.id = id;
    const userCase = resolver.resolve(UpdateDeviceUseCase);
    return await userCase.run(device);
  }

  @Get("/:ID/data")
  async getDeviceData(@Param("ID") id: string): Promise<any[]> {
    const userCase = resolver.resolve(GetDeviceDataUseCase);
    return await userCase.run(id);
  }
}
