import { DeviceModelKey, DeviceModelRepository } from "../repository/DeviceModel.repository";
import { DeviceModel as ModelDeviceModel } from "../../SQL/prisma/client";
import { GenericDeleteUseCase } from "../../common/useCase/GenericDelete.usecase";


export class DeleteDeviceModelUseCase
  extends GenericDeleteUseCase<DeviceModelRepository, ModelDeviceModel, DeviceModelKey> {
  constructor(readonly repository: DeviceModelRepository) {
    super(repository);
   }
}
