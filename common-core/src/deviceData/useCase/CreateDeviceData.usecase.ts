import { DeviceData } from "../entity/DeviceData";
import { SchemaRepository } from "../../schema/repository/Schema.repository";
import { DeviceRepository } from "../../device/repository/Device.repository";
import { DeviceDataRepository } from "../repository/DeviceData.repository";
import { SchemaObjectValidator } from "../../schema/validator/SchemaObject.validator";
import { GetDataSchemaUseCase } from "../../schema/useCase/GetDataSchema.usecase";
import { DeviceModelRepository } from "../../deviceModel/repository/DeviceModel.repository";


export class CreateDeviceDataUseCase {
  constructor(readonly deviceRepository : DeviceRepository,
              readonly deviceModelRepository: DeviceModelRepository,
              readonly deviceDataRepository: DeviceDataRepository,
              readonly dataSchemaRepository: SchemaRepository) { }

  public async run(deviceData: DeviceData) : Promise<string> {
    const deviceId = deviceData.deviceId;
    const device = await this.deviceRepository
      .read({ id: deviceId });

    const deviceModelId = device.deviceModelId;
    const deviceModel = await this.deviceModelRepository
      .read({ id: deviceModelId });

    const schemaName = deviceModel.dataTypeName;
    const getDataSchema = new GetDataSchemaUseCase(this.dataSchemaRepository);
    const schema = await getDataSchema
      .run(schemaName);

    new SchemaObjectValidator(schema)
      .validate(deviceData.data);

    const prismaDeviceData = await this.deviceDataRepository.create(
      deviceId,
      deviceData.data
    );

    return prismaDeviceData.id;
  }
}
