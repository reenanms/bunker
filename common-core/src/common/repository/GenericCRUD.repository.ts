import { PrismaClient as PrismaSQL } from "../../SQL/prisma/client";
import { AlreadyRegisteredError } from "../error/AlreadyRegisteredError";
import { NotRegisteredError } from "../error/NotRegisteredError";

export abstract class GenericCRUDRepository<ModelEntity, ModelEntityKey>
{
  constructor(readonly prisma: PrismaSQL) { }

  protected abstract getKey(data: ModelEntity) : ModelEntityKey; // return { id };

  protected abstract getPrismaDelegate() : any;

  public async create(data: ModelEntity): Promise<ModelEntity> {
    const key = this.getKey(data);
    const foundItens = await this.getPrismaDelegate()
                        .findMany({ where: key });

    if (foundItens.length > 0)
      throw new AlreadyRegisteredError();

    const resultData = await this.getPrismaDelegate().create({ data });
    return resultData;
  }

  public async readAll(): Promise<ModelEntity[]> {
    const foundItens = await this.getPrismaDelegate()
                        .findMany();
    return foundItens;
  }

  public async read(key: ModelEntityKey): Promise<ModelEntity> {
    const foundItens = await this.getPrismaDelegate()
                        .findMany({ where: key });

    if (foundItens.length == 0)
      throw new NotRegisteredError();

    return foundItens[0];
  }
  
  public async update(data: ModelEntity): Promise<ModelEntity> {
    const key = this.getKey(data);
    const foundItens = await this.getPrismaDelegate()
                        .findMany({ where: key });

    if (foundItens.length == 0)
      throw new NotRegisteredError();

      const resultData = await this.getPrismaDelegate().update({ where: key, data });
      return resultData;
  }

  public async delete(key: ModelEntityKey) {
    const foundItens = await this.getPrismaDelegate()
                        .findMany({ where: key });

    if (foundItens.length == 0)
      throw new NotRegisteredError();

    await this.getPrismaDelegate().delete({ where: key });
  }
}
