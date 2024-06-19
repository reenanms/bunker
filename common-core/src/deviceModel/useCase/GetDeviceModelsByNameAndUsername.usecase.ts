import { DeviceModelKey, DeviceModelRepository } from "../repository/DeviceModel.repository";
import { DeviceModel as ModelDeviceModel } from "../../SQL/prisma/client";
import { DeviceModelMapper } from "../mapper/DeviceModel.mapper";
import { DeviceModel } from "../entity/DeviceModel";
import { GenericGetWithFilterUseCase } from "../../common/useCase/GenericGetWithFilter.usecase";


export class GetDeviceModelsByNameAndUsernameUseCase
  extends GenericGetWithFilterUseCase<DeviceModelRepository, DeviceModelMapper, ModelDeviceModel, DeviceModelKey, DeviceModel, { name?: string; username?: string; }> {
  constructor(readonly repository: DeviceModelRepository) {
    super(repository, new DeviceModelMapper());
  }
}
