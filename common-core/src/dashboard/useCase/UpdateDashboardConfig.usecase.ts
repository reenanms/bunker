import { DashboardConfig } from "../entity/DashboardConfig";
import { DashboardConfigMapper } from "../mapper/DashboardConfig.mapper";
import { DashboardConfigRepository } from "../repository/DashboardConfig.repository";


export class UpdateDashboardConfigUseCase {
  readonly mapper = new DashboardConfigMapper();

  constructor(readonly dashboardConfigRepository: DashboardConfigRepository) { }

  public async run(entity: DashboardConfig) : Promise<DashboardConfig> {
    const modelEntity = this.mapper.mapEntityToModel(entity);
    const modelEntityResult = await this.dashboardConfigRepository.update(modelEntity);
    const entityResult = this.mapper.mapModelToEntity(modelEntityResult);
    return entityResult;
  }
}
