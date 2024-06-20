import { container } from 'tsyringe';

import { PrismaClient as PrismaSQL } from "./SQL/prisma/client";
import { GenerateDeviceTokenUseCase } from './auth/userCase/GenerateDeviceToken.usecase';
import { GenerateUserTokenUseCase } from './auth/userCase/GenerateUserToken.usecase';
import { GetUserTokenPayloadUseCase } from './auth/userCase/GetUserTokenPayload.usecase';
import { RefreshUserTokenUseCase } from './auth/userCase/RefreshUserToken.usecase';
import { SchemaRepository } from './schema/repository/Schema.repository';
import { DeviceRepository } from './device/repository/Device.repository';
import { DeviceDataRepository } from './deviceData/repository/DeviceData.repository';
import { CreateDeviceDataUseCase } from './deviceData/useCase/CreateDeviceData.usecase';
import { GetDataSchemaUseCase } from './schema/useCase/GetDataSchema.usecase';
import { UpdateDataSchemaUseCase } from './schema/useCase/UpdateDataSchema.usecase';
import { PrismaClient as PrismaNoSQL } from "./noSQL/prisma/client";
import { UserRepository } from './user/repository/User.repository';
import { CreateUserUseCase } from './user/useCase/CreateUser.usecase';
import { GetUserUseCase } from './user/useCase/GetUser.usecase';
import { DeviceModelRepository } from './deviceModel/repository/DeviceModel.repository';
import { CreateDeviceUseCase } from './device/useCase/CreateDevice.usecase';
import { DeleteDeviceUseCase } from './device/useCase/DeleteDevice.usecase';
import { GetDeviceUseCase } from './device/useCase/GetDevice.usecase';
import { UpdateDeviceUseCase } from './device/useCase/UpdateDevice.usecase';
import { CreateDeviceModelUseCase } from './deviceModel/useCase/CreateDeviceModel.usecase';
import { DeleteDeviceModelUseCase } from './deviceModel/useCase/DeleteDeviceModel.usecase';
import { GetDeviceModelUseCase } from './deviceModel/useCase/GetDeviceModel.usecase';
import { UpdateDeviceModelUseCase } from './deviceModel/useCase/UpdateDeviceModel.usecase';
import { CreateSchemaUseCase } from './schema/useCase/CreateSchema.usecase';
import { DeleteSchemaUseCase } from './schema/useCase/DeleteSchema.usecase';
import { GetSchemaUseCase } from './schema/useCase/GetSchema.usecase';
import { UpdateSchemaUseCase } from './schema/useCase/UpdateSchema.usecase';
import { GetAllUsersUseCase } from './user/useCase/GetAllUsers.usecase';
import { GetAllSchemasUseCase } from './schema/useCase/GetAllSchemas.usecase';
import { GetAllDeviceModelsUseCase } from './deviceModel/useCase/GetAllDeviceModels.usecase';
import { GetAllDevicesUseCase } from './device/useCase/GetAllDevices.usecase';
import { GetDeviceDataUseCase } from './deviceData/useCase/GetDeviceData.usecase';
import { GetDeviceModelsByNameAndUsernameUseCase } from './deviceModel/useCase/GetDeviceModelsByNameAndUsername.usecase';
import { GetDataSchemaFieldsUseCase } from './schema/useCase/GetDataSchemaFields.usecase';
import { DashboardConfigRepository } from './dashboard/repository/DashboardConfig.repository';
import { CreateDashboardConfigUseCase } from './dashboard/useCase/CreateDashboardConfig.usecase';
import { GetDashboardConfigUseCase } from './dashboard/useCase/GetDashboardConfig.usecase';
import { UpdateDashboardConfigUseCase } from './dashboard/useCase/UpdateDashboardConfig.usecase';
import { DeviceTokenRepository } from './deviceToken/repository/DeviceToken.repository';
import { GetDeviceTokensUseCase } from './deviceToken/useCase/GetDeviceTokens.usecase';


export async function init() {
  //sql + nosql
  container.register(PrismaSQL, { useValue: new PrismaSQL() });
  container.register(PrismaNoSQL, { useValue: new PrismaNoSQL() });


  //dashboard
  container.register(DashboardConfigRepository, { useFactory: () => new DashboardConfigRepository(container.resolve(PrismaNoSQL)) });
  container.register(CreateDashboardConfigUseCase, { useFactory: () => new CreateDashboardConfigUseCase(container.resolve(DashboardConfigRepository)) });
  container.register(GetDashboardConfigUseCase, { useFactory: () => new GetDashboardConfigUseCase(container.resolve(DashboardConfigRepository)) });
  container.register(UpdateDashboardConfigUseCase, { useFactory: () => new UpdateDashboardConfigUseCase(container.resolve(DashboardConfigRepository)) });


  //auth
  container.register(GenerateDeviceTokenUseCase, { useFactory: () => new GenerateDeviceTokenUseCase(container.resolve(UserRepository), container.resolve(DeviceTokenRepository)) });
  container.register(GenerateUserTokenUseCase, { useFactory: () => new GenerateUserTokenUseCase(container.resolve(UserRepository)) });
  container.register(RefreshUserTokenUseCase, { useFactory: () => new RefreshUserTokenUseCase() });
  container.register(GetUserTokenPayloadUseCase, { useFactory: () => new GetUserTokenPayloadUseCase() });


  //device
  container.register(DeviceRepository, { useFactory: () => new DeviceRepository(container.resolve(PrismaSQL)) });
  container.register(CreateDeviceUseCase, { useFactory: () => new CreateDeviceUseCase(container.resolve(DeviceRepository)) });
  container.register(DeleteDeviceUseCase, { useFactory: () => new DeleteDeviceUseCase(container.resolve(DeviceRepository)) });
  container.register(GetDeviceUseCase, { useFactory: () => new GetDeviceUseCase(container.resolve(DeviceRepository)) });
  container.register(GetAllDevicesUseCase, { useFactory: () => new GetAllDevicesUseCase(container.resolve(DeviceRepository)) });
  container.register(UpdateDeviceUseCase, { useFactory: () => new UpdateDeviceUseCase(container.resolve(DeviceRepository)) });


  //deviceData
  container.register(DeviceDataRepository, { useFactory: () => new DeviceDataRepository(container.resolve(PrismaNoSQL)) });
  container.register(CreateDeviceDataUseCase, { useFactory: () => new CreateDeviceDataUseCase(
                                                              container.resolve(DeviceRepository),
                                                              container.resolve(DeviceModelRepository),
                                                              container.resolve(DeviceDataRepository),
                                                              container.resolve(SchemaRepository)) });
  container.register(GetDeviceDataUseCase, { useFactory: () => new GetDeviceDataUseCase(container.resolve(DeviceDataRepository)) });


  //deviceModel
  container.register(DeviceModelRepository, { useFactory: () => new DeviceModelRepository(container.resolve(PrismaSQL)) });
  container.register(CreateDeviceModelUseCase, { useFactory: () => new CreateDeviceModelUseCase(container.resolve(DeviceModelRepository)) });
  container.register(DeleteDeviceModelUseCase, { useFactory: () => new DeleteDeviceModelUseCase(container.resolve(DeviceModelRepository)) });
  container.register(GetAllDeviceModelsUseCase, { useFactory: () => new GetAllDeviceModelsUseCase(container.resolve(DeviceModelRepository)) });
  container.register(GetDeviceModelUseCase, { useFactory: () => new GetDeviceModelUseCase(container.resolve(DeviceModelRepository)) });
  container.register(GetDeviceModelsByNameAndUsernameUseCase, { useFactory: () => new GetDeviceModelsByNameAndUsernameUseCase(container.resolve(DeviceModelRepository)) });
  container.register(UpdateDeviceModelUseCase, { useFactory: () => new UpdateDeviceModelUseCase(container.resolve(DeviceModelRepository)) });
  

  //deviceToken
  container.register(DeviceTokenRepository, { useFactory: () => new DeviceTokenRepository(container.resolve(PrismaSQL)) });
  container.register(GetDeviceTokensUseCase, { useFactory: () => new GetDeviceTokensUseCase(container.resolve(DeviceTokenRepository)) });


  //schema
  container.register(SchemaRepository, { useFactory: () => new SchemaRepository(container.resolve(PrismaSQL)) });
  container.register(CreateSchemaUseCase, { useFactory: () => new CreateSchemaUseCase(container.resolve(SchemaRepository)) });
  container.register(DeleteSchemaUseCase, { useFactory: () => new DeleteSchemaUseCase(container.resolve(SchemaRepository)) });
  container.register(GetAllSchemasUseCase, { useFactory: () => new GetAllSchemasUseCase(container.resolve(SchemaRepository)) });
  container.register(GetDataSchemaUseCase, { useFactory: () => new GetDataSchemaUseCase(container.resolve(SchemaRepository)) });
  container.register(GetDataSchemaFieldsUseCase, { useFactory: () => new GetDataSchemaFieldsUseCase(container.resolve(SchemaRepository)) });
  container.register(GetSchemaUseCase, { useFactory: () => new GetSchemaUseCase(container.resolve(SchemaRepository)) });
  container.register(UpdateDataSchemaUseCase, { useFactory: () => new UpdateDataSchemaUseCase(container.resolve(SchemaRepository)) });
  container.register(UpdateSchemaUseCase, { useFactory: () => new UpdateSchemaUseCase(container.resolve(SchemaRepository)) });


  //user
  container.register(UserRepository, { useFactory: () => new UserRepository(container.resolve(PrismaSQL)) });
  container.register(CreateUserUseCase, { useFactory: () => new CreateUserUseCase(container.resolve(UserRepository)) });
  container.register(GetAllUsersUseCase, { useFactory: () => new GetAllUsersUseCase(container.resolve(UserRepository)) });
  container.register(GetUserUseCase, { useFactory: () => new GetUserUseCase(container.resolve(UserRepository)) });
}
