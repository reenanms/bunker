import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  Delete,
  Get,
  Put,
} from "@nestjs/common";
import * as resolver from "common-core/resolver";
import { CreateSchemaUseCase } from "common-core/schema/useCase/CreateSchema.usecase";
import { DeleteSchemaUseCase } from "common-core/schema/useCase/DeleteSchema.usecase";
import { GetAllSchemasUseCase } from "common-core/schema/useCase/GetAllSchemas.usecase";
import { GetSchemaUseCase } from "common-core/schema/useCase/GetSchema.usecase";
import { UpdateSchemaUseCase } from "common-core/schema/useCase/UpdateSchema.usecase";
import { Schema } from "common-core/schema/entity/Schema";
import { AuthGuard } from "../auth.guard";

@UseGuards(AuthGuard)
@Controller("/schema")
export class SchemaController {
  constructor() {}

  @Get("/")
  async getAllSchemas() {
    const userCase = resolver.resolve(GetAllSchemasUseCase);
    return await userCase.run();
  }

  @Post("/")
  async createSchema(@Body() schema: Schema) {
    const userCase = resolver.resolve(CreateSchemaUseCase);
    await userCase.run(schema);
  }

  @Delete("/:NAME")
  async deleteSchema(@Param("NAME") name: string) {
    const userCase = resolver.resolve(DeleteSchemaUseCase);
    await userCase.run(name);
  }

  @Get("/:NAME")
  async getSchema(@Param("NAME") name: string): Promise<Schema> {
    const userCase = resolver.resolve(GetSchemaUseCase);
    return await userCase.run(name);
  }

  @Put("/:NAME")
  async updateSchema(@Param("NAME") name: string, @Body() schema: Schema) {
    schema.name = name;
    const userCase = resolver.resolve(UpdateSchemaUseCase);
    await userCase.run(schema);
  }
}
