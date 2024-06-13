import { DeviceModelKey, DeviceModelRepository } from "../repository/DeviceModel.repository";
import { DeviceModel as ModelDeviceModel } from "../../SQL/prisma/client";
import { DeviceModelMapper } from "../mapper/DeviceModel.mapper";
import { DeviceModel } from "../entity/DeviceModel";
import { GenericGetAllUseCase } from "../../common/useCase/GenericGetAll.usecase";


export class GetAllDeviceModelsUseCase
  extends GenericGetAllUseCase<DeviceModelRepository, DeviceModelMapper, ModelDeviceModel, DeviceModelKey, DeviceModel> {
  constructor(readonly repository: DeviceModelRepository) {
    super(repository, new DeviceModelMapper());
   }
}
