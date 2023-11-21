import { DeviceRepository } from "../../src/deviceData/repository/Device.repository";
import { DataSchemaFactory } from "../../src/deviceData/factory/DataSchema.factory";
import { DeviceFactory } from "../../src/deviceData/factory/Device.factory";


export class DataConsistency {
  static async getDeviceWithIntegerData(deviceRepository: DeviceRepository) {
    const integerScheme = DataSchemaFactory.createInteger();
    const deviceModel = DeviceFactory.createDeviceModel("deviceModelTest", "deviceModelTest", integerScheme);
    const device = DeviceFactory.createDevice("deviceTest", deviceModel);
    const { schema, ...offalDevice } = device.model;
    const prismaDevice = { dataTypeName: schema.name, ...offalDevice };
  
    try {
      await deviceRepository.createDeviceModel(prismaDevice);
      await deviceRepository.createDevice(device);
    } catch (e) {
      console.log(e);
    }
  
    return device;
  }
  
}