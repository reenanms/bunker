import { DataSchema } from "../../schema/entity/DataSchema";
import { Device } from "../../device/entity/Device";
import { DeviceModel } from "../../deviceModel/entity/DeviceModel";


export class DeviceFactory {
  static createDeviceModel(id: string, name: string, description: string, username: string, schema: DataSchema): DeviceModel {
    return { id, name, description, username, schemaName: schema.name };
  }

  static createDevice(id: string, name: string, model: DeviceModel): Device {
    return { id, name, deviceModelId: model.id };
  }
}
