import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Put,
  Request,
} from "@nestjs/common";
import * as resolver from "common-core/resolver";

import { CreateDashboardConfigUseCase } from "common-core/dashboard/useCase/CreateDashboardConfig.usecase"
import { GetDashboardConfigUseCase } from "common-core/dashboard/useCase/GetDashboardConfig.usecase"
import { UpdateDashboardConfigUseCase} from "common-core/dashboard/useCase/UpdateDashboardConfig.usecase"

import { DashboardConfig } from "common-core/dashboard/entity/DashboardConfig"
import { AuthGuard } from "../auth.guard";

@UseGuards(AuthGuard)
@Controller("/dashboard")
export class DashboardController {
  constructor() {}

  @Get("/config")
  async getDashboardConfig(@Request() request): Promise<DashboardConfig> {
    const username = request.auth.username;
    const userCase = resolver.resolve(GetDashboardConfigUseCase);
    return await userCase.run(username);
  }

  @Post("/config")
  async createDashboardConfig(@Request() request, @Body() config: any): Promise<DashboardConfig> {
    const username = request.auth.username;
    const data = {
      username,
      config
    };
    const userCase = resolver.resolve(CreateDashboardConfigUseCase);
    return await userCase.run(data);
  }


  @Put("/config")
  async updateDevice(@Request() request, @Body() config: any): Promise<DashboardConfig> {
    const username = request.auth.username;
    const data = {
      username,
      config
    };
    const userCase = resolver.resolve(UpdateDashboardConfigUseCase);
    return await userCase.run(data);
  }
}
