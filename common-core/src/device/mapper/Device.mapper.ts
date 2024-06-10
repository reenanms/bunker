import model from "../../SQL/prisma/client";
import { Device } from "../entity/Device";
import { ModelEntityMapper } from "../../common/mapper/ModelEntity.mapper";


export class DeviceMapper implements ModelEntityMapper<model.Device, Device> {
  public mapEntityToModel(entity: Device): model.Device {
    return entity;
  }

  public mapModelToEntity(modelEntity: model.Device): Device {
    return modelEntity;
  }
}
