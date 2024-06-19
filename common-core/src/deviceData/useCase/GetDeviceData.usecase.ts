import { DeviceDataRepository } from "../repository/DeviceData.repository";


export class GetDeviceDataUseCase {
  constructor(readonly deviceDataRepository: DeviceDataRepository) { }

  public async run(deviceId: string) : Promise<any[]> {
    const deviceData = await this.deviceDataRepository.read(deviceId)
    const dataResult = deviceData.map(e => e.data);
    return dataResult;
  }
}
