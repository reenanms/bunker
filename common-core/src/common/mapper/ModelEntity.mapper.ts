export interface ModelEntityMapper<ModelEntity, Entity> {
  mapEntityToModel(entity: Entity): ModelEntity;
  mapModelToEntity(modelEntity: ModelEntity): Entity;
}
