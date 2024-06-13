import { DataSchema } from "../../schema/entity/DataSchema";
import { Device } from "../../device/entity/Device";
import { DeviceModel } from "../../deviceModel/entity/DeviceModel";


export class DeviceFactory {
  static createDeviceModel(id: string, description: string, schema: DataSchema): DeviceModel {
    return { id, description, schemaName: schema.name };
  }

  static createDevice(id: string, model: DeviceModel): Device {
    return { id, deviceModelId: model.id };
  }
}
