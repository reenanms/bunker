import { MessageReceiverFactory } from "common-core/common/communication/receiver/MessageReceiverFactory";
import { CreateDeviceDataUseCase } from "common-core/deviceData/useCase/CreateDeviceData.usecase";
import { PrismaClient as PrismaSQL } from "common-core/SQL/prisma/client";
import { PrismaClient as PrismaNoSQL } from "common-core/noSQL/prisma/client";
import { DataSchemaRepository } from "common-core/deviceData/repository/DataSchema.repository";
import { DeviceRepository } from "common-core/deviceData/repository/Device.repository";
import { DeviceDataRepository } from "common-core/deviceData/repository/DeviceData.repository";
import { DeviceData } from "common-core/deviceData/entity/DeviceData";
import { MessageReceiverConfig } from "common-core/common/communication/receiver/MessageReceiver";
import { BaseError } from "common-core/common/error/BaseError";
import { MessageSenderConfig } from "common-core/common/communication/sender/MessageSender";
import envs from "dotenv";


function errorHandler(error: unknown) {
  if (error instanceof BaseError)
      console.log((error as BaseError).message);
  else
    console.error(error);
}


async function messageHandler(config: MessageReceiverConfig , message: string) {
  console.log(`Message received from topic ${config.topic}: ${message}`);

  const sqlConnection = new PrismaSQL();
  const noSqlConnection = new PrismaNoSQL();
  
  try {
    const deviceRepository = new DeviceRepository(sqlConnection);
    const deviceDataRepository = new DeviceDataRepository(noSqlConnection);
    const dataSchemaRepository = new DataSchemaRepository(sqlConnection);
    const createDeviceDataUseCase = new CreateDeviceDataUseCase(
      deviceRepository,
      deviceDataRepository,
      dataSchemaRepository
    );

    const deviceData: DeviceData = JSON.parse(message);
    await createDeviceDataUseCase.run(deviceData);
  } catch (error) {
    errorHandler(error);
  }

  noSqlConnection.$disconnect();
  sqlConnection.$disconnect();
}

async function endless() {
  while (true) await new Promise((r) => setTimeout(r, 100));
}

function getDeviceDataTopicConfig() : MessageReceiverConfig | MessageSenderConfig
{
  const config = {
    id: process.env.MESSAGER_ID!,
    brokers: process.env.MESSAGER_BROKERS!.split(","),
    topic: process.env.MESSAGER_TOPIC_DEVICE_DATA!,
  };
  return config;
}

async function main() {
  envs.config();

  const config = getDeviceDataTopicConfig();
  const receiver = MessageReceiverFactory.Create(config);
  await receiver.Start(messageHandler);

  await endless();
}

main()
  .then()
  .catch(errorHandler);
