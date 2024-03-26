import { DeviceData } from "../entity/DeviceData";
import { DataSchemaRepository } from "../repository/DataSchema.repository";
import { DeviceRepository } from "../repository/Device.repository";
import { DeviceDataRepository } from "../repository/DeviceData.repository";
import { SchemaObjectValidator } from "../validator/SchemaObject.validator";
import { GetDataSchemaUseCase } from "./GetDataSchema.usecase";


export class CreateDeviceDataUseCase {
  constructor(readonly deviceRepository : DeviceRepository,
              readonly deviceDataRepository: DeviceDataRepository,
              readonly dataSchemaRepository: DataSchemaRepository) { }

  public async run(deviceData: DeviceData) : Promise<string> {
    const deviceId = deviceData.deviceId;
    const schemaName = await this.deviceRepository
      .getDeviceSchemaName(deviceId);

    const getDataSchema = new GetDataSchemaUseCase(this.dataSchemaRepository);
    const schema = await getDataSchema
      .run(schemaName);

    new SchemaObjectValidator(schema)
      .validate(deviceData.data);

    const prismaDeviceData = await this.deviceDataRepository.create(
      deviceId,
      String(deviceData.data)
    );

    return prismaDeviceData.id;
  }
}
