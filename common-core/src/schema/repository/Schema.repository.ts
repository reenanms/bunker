import { PrismaClient as PrismaSQL, DataType, DataTypeObject, DataTypeArray, DataTypeBasic } from "../../SQL/prisma/client";

export class SchemaRepository {
  constructor(readonly prisma: PrismaSQL) { }

  public async updateDataType(dataType: DataType) : Promise<DataType> {
    return await this.prisma.dataType.update( {
      data: dataType,
      where: { name: dataType.name }
    });
  }

  public async updateDataTypeObject(dataTypeObject: DataTypeObject): Promise<DataTypeObject> {
    return await this.prisma.dataTypeObject.update({
      data: dataTypeObject,
      where: {
        parentDataTypeName_propertyName: {
          parentDataTypeName: dataTypeObject.parentDataTypeName,
          propertyName: dataTypeObject.propertyDataTypeName
        }
      }
    });
  }

  public async updateDataTypeObjects(dataTypeObjects: DataTypeObject[]): Promise<DataTypeObject[]> {
    const dataTypeObjectsResult : DataTypeObject[] = [];
    for (const dataTypeObject of dataTypeObjects) {
      const { parentDataTypeName, propertyName, ...rest} = dataTypeObject;
      const dataTypeObjectResult = await this.prisma.dataTypeObject.update({
        data: dataTypeObject,
        where: {
          parentDataTypeName_propertyName: {
            parentDataTypeName,
            propertyName
          }
        }
      });

      dataTypeObjectsResult.push(dataTypeObjectResult);
    }

    return dataTypeObjectsResult;
  }

  public async updateDataTypeArray(dataTypeArray: DataTypeArray): Promise<DataTypeArray> {
    return await this.prisma.dataTypeArray.update({
      data: dataTypeArray,
      where: { parentDataTypeName: dataTypeArray.parentDataTypeName }
    });
  }

  public async updateDataTypeBasic(dataTypeBasic: DataTypeBasic) : Promise<DataTypeBasic> {
    return await this.prisma.dataTypeBasic.update({
      data: dataTypeBasic,
      where: { parentDataTypeName: dataTypeBasic.parentDataTypeName }
    });
  }

  public async createDataType(dataType: DataType): Promise<DataType> {
    return await this.prisma.dataType.create({
      data: dataType
    });
  }

  public async createDataTypeObject(dataTypeObject: DataTypeObject): Promise<DataTypeObject> {
    return await this.prisma.dataTypeObject.create({
      data: dataTypeObject
    });
  }

  public async createDataTypeObjects(dataTypeObjects: DataTypeObject[]): Promise<DataTypeObject[]> {
    const dataTypeObjectsResult : DataTypeObject[] = [];
    for (const dataTypeObject of dataTypeObjects) {
      const dataTypeObjectResult =  await this.prisma.dataTypeObject.create({
        data: dataTypeObject
      });
      dataTypeObjectsResult.push(dataTypeObjectResult);
    }

    return dataTypeObjectsResult;
  }

  public async createDataTypeArray(dataTypeArray: DataTypeArray): Promise<DataTypeArray> {
    return await this.prisma.dataTypeArray.create({
      data: dataTypeArray
    });
  }

  public async createDataTypeBasic(dataTypeBasic: DataTypeBasic): Promise<DataTypeBasic> {
    return await this.prisma.dataTypeBasic.create({
      data: dataTypeBasic
    });
  }

  public async getDataType(name : string) : Promise<DataType> {
    const dataType = await this.prisma.dataType.findUniqueOrThrow({
      where: { name: name },
    });
    return dataType;
  }

  public async getAllDataTypes() : Promise<DataType[]> {
    const dataTypes = await this.prisma.dataType.findMany();
    return dataTypes;
  }

  public async getDataTypeObjects(parentDataTypeName : string) : Promise<DataTypeObject[]> {
    const dataTypeObject = await this.prisma.dataTypeObject.findMany({
      where: { parentDataTypeName: parentDataTypeName },
    });
    return dataTypeObject;
  }
  
  public async getDataTypeArray(parentDataTypeName : string) : Promise<DataTypeArray> {
    const dataTypeArray = await this.prisma.dataTypeArray.findUniqueOrThrow({
      where: { parentDataTypeName: parentDataTypeName },
    });
    return dataTypeArray;
  }

  public async getDataTypeBasic(parentDataTypeName : string) : Promise<DataTypeBasic> {
    const dataTypeBasic = await this.prisma.dataTypeBasic.findUniqueOrThrow({
      where: { parentDataTypeName: parentDataTypeName },
    });
    return dataTypeBasic;
  }

  public async deleteDataType(name : string) {
    await this.prisma.dataType.delete({
      where: { name: name },
    });
  }

  public async deleteDataTypeObjects(parentDataTypeName: string) {
    await this.prisma.dataTypeObject.deleteMany({
      where: { parentDataTypeName: parentDataTypeName },
    });
  }

  public async deleteDataTypeObject(dataTypeObjects: { parentDataTypeName: string, propertyName: string }[]) {
    for (const dataTypeObject of dataTypeObjects) {
      await this.prisma.dataTypeObject.delete({
        where: {
          parentDataTypeName_propertyName: {
            parentDataTypeName: dataTypeObject.parentDataTypeName,
            propertyName: dataTypeObject.propertyName }
          }
      });
    }
  }
  
  public async deleteDataTypeArray(parentDataTypeName: string) {
    await this.prisma.dataTypeArray.delete({
      where: { parentDataTypeName: parentDataTypeName },
    });
  }

  public async deleteDataTypeBasic(parentDataTypeName : string) {
    await this.prisma.dataTypeBasic.delete({
      where: { parentDataTypeName: parentDataTypeName },
    });
  }
}
