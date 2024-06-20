import { DashboardConfig, PrismaClient as PrismaNoSQL } from "../../noSQL/prisma/client";


export class DashboardConfigRepository {
  constructor(readonly prisma: PrismaNoSQL) { }

  public async create(data: DashboardConfig) : Promise<DashboardConfig> {
    const dashboardConfig = await this.prisma.dashboardConfig.create({
      data
    });
    
    return dashboardConfig;
  }

  public async update(data: DashboardConfig) : Promise<DashboardConfig> {
    const dashboardConfig = await this.prisma.dashboardConfig.update({
      data,
      where: { username: data.username }
    });
    
    return dashboardConfig;
  }

  public async read(username: string) : Promise<DashboardConfig> {
    const deviceData = await this.prisma.dashboardConfig.findFirstOrThrow({
      where: { username }
    });
    
    return deviceData;
  }
}
