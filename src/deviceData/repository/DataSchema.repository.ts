import { PrismaClient as PrismaSQL, DataType, DataTypeObject, DataTypeArray, DataTypeBasic } from "../../SQL/prisma/client";


export class DataSchemaRepository {
  constructor(readonly prisma: PrismaSQL) { }

  public async updatePrismaDataType(dataType: DataType) {
    await this.prisma.dataType.update( {
      data: dataType,
      where: { name: dataType.name }
    });
  }

  public async updatePrismaDataTypeObject(dataTypeObject: DataTypeObject) {
    await this.prisma.dataTypeObject.update({
      data: dataTypeObject,
      where: {
        parentDataTypeName_propertyName: {
          parentDataTypeName: dataTypeObject.parentDataTypeName,
          propertyName: dataTypeObject.propertyDataTypeName
        }
      }
    });
  }

  public async updatePrismaDataTypeArray(dataTypeArray: DataTypeArray) {
    await this.prisma.dataTypeArray.update({
      data: dataTypeArray,
      where: { parentDataTypeName: dataTypeArray.parentDataTypeName }
    });
  }

  public async updatePrismaDataTypeBasic(dataTypeBasic: DataTypeBasic) {
    await this.prisma.dataTypeBasic.update({
      data: dataTypeBasic,
      where: { parentDataTypeName: dataTypeBasic.parentDataTypeName }
    });
  }

  public async createPrismaDataType(dataType: DataType) {
    await this.prisma.dataType.create({
      data: dataType
    });
  }

  public async createPrismaDataTypeObject(dataTypeObject: DataTypeObject) {
    await this.prisma.dataTypeObject.create({
      data: dataTypeObject
    });
  }

  public async createPrismaDataTypeArray(dataTypeArray: DataTypeArray) {
    await this.prisma.dataTypeArray.create({
      data: dataTypeArray
    });
  }

  public async createPrismaDataTypeBasic(dataTypeBasic: DataTypeBasic) {
    await this.prisma.dataTypeBasic.create({
      data: dataTypeBasic
    });
  }

  public async getPrismaDataType(name : string) : Promise<DataType> {
    const dataType = await this.prisma.dataType.findUniqueOrThrow({
      where: { name: name },
    });
    return dataType;
  }

  public async getPrismaDataTypeObject(parentDataTypeName : string) : Promise<DataTypeObject[]> {
    const dataTypeObject = await this.prisma.dataTypeObject.findMany({
      where: { parentDataTypeName: parentDataTypeName },
    });
    return dataTypeObject;
  }
  
  public async getPrismaDataTypeArray(parentDataTypeName : string) : Promise<DataTypeArray> {
    const dataTypeArray = await this.prisma.dataTypeArray.findUniqueOrThrow({
      where: { parentDataTypeName: parentDataTypeName },
    });
    return dataTypeArray;
  }

  public async getPrismaDataTypeBasic(parentDataTypeName : string) : Promise<DataTypeBasic> {
    const dataTypeBasic = await this.prisma.dataTypeBasic.findUniqueOrThrow({
      where: { parentDataTypeName: parentDataTypeName },
    });
    return dataTypeBasic;
  }
}