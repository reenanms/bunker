import model from "../../noSQL/prisma/client";
import { DashboardConfig } from "../entity/DashboardConfig";
import { ModelEntityMapper } from "../../common/mapper/ModelEntity.mapper";


export class DashboardConfigMapper implements ModelEntityMapper<model.DashboardConfig, DashboardConfig> {
  public mapEntityToModel(entity: DashboardConfig): model.DashboardConfig {
    return {
      id: undefined,
      username: entity.username,
      config: JSON.stringify(entity.config)
    };
  }

  public mapModelToEntity(modelEntity: model.DashboardConfig): DashboardConfig {
    return {
      username: modelEntity.username,
      config: JSON.parse(modelEntity.config)
    };
  }
}
