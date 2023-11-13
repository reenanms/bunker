import { DataSchema } from "../entity/DataSchema";
import { Device } from "../entity/Device";
import { DeviceModel } from "../entity/DeviceModel";


export class DeviceFactory {
  static createDeviceModel(id: string, description: string, schema: DataSchema): DeviceModel {
    return { id, description, schema };
  }

  static createDevice(id: string, model: DeviceModel): Device {
    return { id, model };
  }
}
