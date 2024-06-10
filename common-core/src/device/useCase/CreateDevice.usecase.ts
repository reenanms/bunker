import { Device } from "../entity/Device";
import { DeviceKey, DeviceRepository } from "../repository/Device.repository";
import model from "../../SQL/prisma/client";
import { GenericCreateUseCase } from "../../common/useCase/GenericCreate.usecase";
import { DeviceMapper } from "../mapper/Device.mapper";


export class CreateDeviceUseCase
  extends GenericCreateUseCase<DeviceRepository, DeviceMapper, model.Device, DeviceKey, Device> {
  constructor(readonly repository: DeviceRepository) {
    super(repository, new DeviceMapper());
   }
}
