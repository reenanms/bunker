import { GenericCRUDRepository } from "../repository/GenericCRUD.repository";


export abstract class GenericDeleteUseCase<
    Repository extends GenericCRUDRepository<ModelEntity, ModelEntityKey>,
    ModelEntity,
    ModelEntityKey> {
  constructor(readonly repository: Repository) { }

  public async run(key: ModelEntityKey) {
    await this.repository.delete(key);
  }
}
