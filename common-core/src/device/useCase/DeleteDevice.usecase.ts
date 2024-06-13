import { DeviceKey, DeviceRepository } from "../repository/Device.repository";
import model from "../../SQL/prisma/client";
import { GenericDeleteUseCase } from "../../common/useCase/GenericDelete.usecase";

export class DeleteDeviceUseCase
  extends GenericDeleteUseCase<DeviceRepository, model.Device, DeviceKey> {
  constructor(readonly repository: DeviceRepository) {
    super(repository);
   }
}
