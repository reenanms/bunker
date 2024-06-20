import { DashboardConfig } from "../entity/DashboardConfig";
import { DashboardConfigMapper } from "../mapper/DashboardConfig.mapper";
import { DashboardConfigRepository } from "../repository/DashboardConfig.repository";


export class GetDashboardConfigUseCase {
  readonly mapper = new DashboardConfigMapper();

  constructor(readonly dashboardConfigRepository: DashboardConfigRepository) { }

  public async run(username: string) : Promise<DashboardConfig> {
    const modelDashboardConfig = await this.dashboardConfigRepository.read(username);
    const entityResult = this.mapper.mapModelToEntity(modelDashboardConfig);
    return entityResult;
  }
}
