import { GenericCRUDRepository } from "../repository/GenericCRUD.repository";
import { ModelEntityMapper } from "../mapper/ModelEntity.mapper";


export abstract class GenericGetUseCase<
    Repository extends GenericCRUDRepository<ModelEntity, ModelEntityKey>,
    Mapper extends ModelEntityMapper<ModelEntity, Entity>,
    ModelEntity,
    ModelEntityKey,
    Entity> {
  constructor(readonly repository: Repository, readonly mapper: Mapper) { }

  public async run(key: ModelEntityKey): Promise<Entity> {
    const modelEntity = await this.repository.read(key);
    const entity = this.mapper.mapModelToEntity(modelEntity);
    return entity;
  }
}
