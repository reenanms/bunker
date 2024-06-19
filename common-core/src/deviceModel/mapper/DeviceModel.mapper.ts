import model from "../../SQL/prisma/client";
import { DeviceModel } from "../entity/DeviceModel";
import { ModelEntityMapper } from "../../common/mapper/ModelEntity.mapper";


export class DeviceModelMapper implements ModelEntityMapper<model.DeviceModel, DeviceModel> {
  public mapEntityToModel(entity: DeviceModel): model.DeviceModel {
    return {
      id: entity.id,
      name: entity.name,
      username: entity.username,
      description: entity.description,
      dataTypeName: entity.schemaName
    };
  }

  public mapModelToEntity(modelEntity: model.DeviceModel): DeviceModel {
    return {
      id: modelEntity.id,
      name: modelEntity.name,
      username: modelEntity.username,
      description: modelEntity.description,
      schemaName: modelEntity.dataTypeName
    };
  }
}
