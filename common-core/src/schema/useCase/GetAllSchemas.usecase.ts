import { SchemaRepository } from "../repository/Schema.repository";
import { Schema, SchemaWioutDefinition } from "../entity/Schema";
import { SchemaMapper } from "../mapper/Schema.mapper";
import model, { DataTypes as ModelDataTypes } from "../../SQL/prisma/client";

export class GetAllSchemasUseCase {
  private readonly mapper = new SchemaMapper();

  constructor(readonly repository: SchemaRepository) { }

  public async run(): Promise<SchemaWioutDefinition[]> {
    const modelSchemaResults = await this.repository.getAllDataTypes();
    
    const schemas: SchemaWioutDefinition[] = [];
    for (const modelSchemaResult of modelSchemaResults) {
      const schema = this.mapper.schemaModelToEntity(modelSchemaResult);
      schemas.push(schema);
    }

    return schemas;
  }
}
