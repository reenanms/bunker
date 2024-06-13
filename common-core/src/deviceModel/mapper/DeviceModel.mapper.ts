import model from "../../SQL/prisma/client";
import { DeviceModel } from "../entity/DeviceModel";
import { ModelEntityMapper } from "../../common/mapper/ModelEntity.mapper";


export class DeviceModelMapper implements ModelEntityMapper<model.DeviceModel, DeviceModel> {
  public mapEntityToModel(entity: DeviceModel): model.DeviceModel {
    return {
      id: entity.id,
      description: entity.description,
      dataTypeName: entity.schemaName
    };
  }

  public mapModelToEntity(modelEntity: model.DeviceModel): DeviceModel {
    return {
      id: modelEntity.id,
      description: modelEntity.description,
      schemaName: modelEntity.dataTypeName
    };
  }
}
