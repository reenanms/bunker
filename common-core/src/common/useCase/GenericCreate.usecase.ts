import { GenericCRUDRepository } from "../repository/GenericCRUD.repository";
import { ModelEntityMapper } from "../mapper/ModelEntity.mapper";


export abstract class GenericCreateUseCase<
    Repository extends GenericCRUDRepository<ModelEntity, ModelEntityKey>,
    Mapper extends ModelEntityMapper<ModelEntity, Entity>,
    ModelEntity,
    ModelEntityKey,
    Entity> {
  constructor(readonly repository: Repository, readonly mapper: Mapper) { }

  public async run(entity: Entity): Promise<Entity> {
    const modelEntity = this.mapper.mapEntityToModel(entity);
    const resultModelEntity = await this.repository.create(modelEntity);
    const resultEntity = this.mapper.mapModelToEntity(resultModelEntity);
    return resultEntity;
  }
}
