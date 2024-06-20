import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { DashboardController } from "./dashboard/dashboard.controller";
import { AuthController } from "./auth/auth.controller";
import { DeviceController } from "./device/device.controller";
import { DeviceModelController } from "./deviceModel/deviceModel.controller";
import { SchemaController } from "./schema/schema.controller";
import { UserController } from "./user/user.controller";

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: ".env" })],
  controllers: [
    DashboardController,
    AuthController,
    DeviceController,
    DeviceModelController,
    SchemaController,
    UserController,
  ],
  providers: [],
})
export class AppModule {}
