import { GenericCRUDRepository } from "../repository/GenericCRUD.repository";
import { ModelEntityMapper } from "../mapper/ModelEntity.mapper";


export abstract class GenericGetAllUseCase<
    Repository extends GenericCRUDRepository<ModelEntity, ModelEntityKey>,
    Mapper extends ModelEntityMapper<ModelEntity, Entity>,
    ModelEntity,
    ModelEntityKey,
    Entity> {
  constructor(readonly repository: Repository, readonly mapper: Mapper) { }

  public async run(): Promise<Entity[]> {
    const modelEntities = await this.repository.readAll();

    const entities: Entity[] = [];
    for (const modelEntity of modelEntities) {
      const entity = this.mapper.mapModelToEntity(modelEntity);
      entities.push(entity);
    }

    return entities;
  }
}
