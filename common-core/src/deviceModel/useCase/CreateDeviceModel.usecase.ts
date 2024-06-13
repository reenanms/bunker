import { DeviceKey } from "../../device/repository/Device.repository";
import { DeviceModel as ModelDeviceModel } from "../../SQL/prisma/client";
import { DeviceModel } from "../entity/DeviceModel";
import { DeviceModelRepository } from "../repository/DeviceModel.repository";
import { GenericCreateUseCase } from "../../common/useCase/GenericCreate.usecase";
import { DeviceModelMapper } from "../mapper/DeviceModel.mapper";


export class CreateDeviceModelUseCase
  extends GenericCreateUseCase<DeviceModelRepository, DeviceModelMapper, ModelDeviceModel, DeviceKey, DeviceModel> {
  constructor(readonly repository: DeviceModelRepository) {
    super(repository, new DeviceModelMapper());
  }
}
