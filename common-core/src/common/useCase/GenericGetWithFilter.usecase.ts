import { ModelEntityMapper } from "../mapper/ModelEntity.mapper";
import { GenericCRUDWithFilterRepository } from "../repository/GenericCRUDWithFilter.repository";


export abstract class GenericGetWithFilterUseCase<
    Repository extends GenericCRUDWithFilterRepository<ModelEntity, ModelEntityKey, ModelEntityFilter>,
    Mapper extends ModelEntityMapper<ModelEntity, Entity>,
    ModelEntity,
    ModelEntityKey,
    Entity,
    ModelEntityFilter> {
  constructor(readonly repository: Repository, readonly mapper: Mapper) { }

  public async run(filter: ModelEntityFilter): Promise<Entity[]> {
    const modelEntities = await this.repository.readFilter(filter);

    const entities: Entity[] = [];
    for (const modelEntity of modelEntities) {
      const entity = this.mapper.mapModelToEntity(modelEntity);
      entities.push(entity);
    }

    return entities;
  }
}
