import { GenericCRUDRepository } from "./GenericCRUD.repository";


export abstract class GenericCRUDWithFilterRepository<ModelEntity, ModelEntityKey, ModelEntityFilter>
  extends GenericCRUDRepository<ModelEntity, ModelEntityKey> {
  public async readFilter(filter: ModelEntityFilter): Promise<ModelEntity[]> {
    const foundItens = await this.getPrismaDelegate()
      .findMany({ where: filter });
    return foundItens;
  }
}
