import { SchemaRepository } from "../repository/Schema.repository";
import { Schema } from "../entity/Schema";
import { SchemaMapper } from "../mapper/Schema.mapper";



export class DeleteSchemaUseCase {
  private readonly mapper = new SchemaMapper();

  constructor(readonly repository: SchemaRepository) { }

  public async run(schemaName: string) {
    try {
      await this.repository.deleteDataTypeBasic(schemaName);
    } catch {}
    
    try {
      await this.repository.deleteDataTypeObjects(schemaName);
    } catch {}
    
    try {
      await this.repository.deleteDataTypeArray(schemaName);
    } catch {}

    await this.repository.deleteDataType(schemaName);
  }
}
