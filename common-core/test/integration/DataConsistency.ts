import { DeviceRepository } from "../../src/device/repository/Device.repository";
import { DeviceModelRepository } from "../../src/deviceModel/repository/DeviceModel.repository";
import { DataSchemaFactory } from "../../src/schema/factory/DataSchema.factory";
import { DeviceFactory } from "../../src/deviceData/factory/Device.factory";


export class DataConsistency {
  static async getDeviceWithIntegerData(deviceRepository: DeviceRepository, deviceModelRepository: DeviceModelRepository) {
    const integerScheme = DataSchemaFactory.createInteger();
    const deviceModel = DeviceFactory.createDeviceModel("deviceModelTest", "deviceModelTest", integerScheme);
    const device = DeviceFactory.createDevice("deviceTest", deviceModel);
    const { schema, ...offalDeviceModel } = device.model;
    const prismaDeviceModel = { dataTypeName: schema.name, ...offalDeviceModel };
    const prismaDevice = { id: device.id, deviceModelId: device.model.id };
  
    try {
      await deviceModelRepository.create(prismaDeviceModel);
      await deviceRepository.create(prismaDevice);
    } catch (e) {
      console.log(e);
    }
  
    return device;
  }
  
}