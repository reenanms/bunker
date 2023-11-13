import { DataSchemaRepository } from "../repository/DataSchema.repository";
import { DeviceRepository } from "../repository/Device.repository";


export class CreateDeviceDataUseCase {
  constructor(readonly deviceRepository : DeviceRepository,
              readonly dataSchemaRepository : DataSchemaRepository) { }

  public async run(deviceId: string) : Promise<string> {
    const schemaName = await this.deviceRepository.getDeviceSchemaName(deviceId);

    return deviceId;
  }
}