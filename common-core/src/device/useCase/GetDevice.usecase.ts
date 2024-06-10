import { DeviceKey, DeviceRepository } from "../repository/Device.repository";
import { Device as ModelDevice } from "../../SQL/prisma/client";
import { DeviceMapper } from "../mapper/Device.mapper";
import { Device } from "../entity/Device";
import { GenericGetUseCase } from "../../common/useCase/GenericGet.usecase";


export class GetDeviceUseCase
  extends GenericGetUseCase<DeviceRepository, DeviceMapper, ModelDevice, DeviceKey, Device> {
  constructor(readonly repository: DeviceRepository) {
    super(repository, new DeviceMapper());
   }
}
