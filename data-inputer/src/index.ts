import { MessageReceiverFactory } from "./common/communication/receiver/MessageReceiverFactory";
import { CreateDeviceDataUseCase } from "./deviceData/useCase/CreateDeviceData.usecase";
import { PrismaClient as PrismaSQL } from "./SQL/prisma/client";
import { PrismaClient as PrismaNoSQL } from "./noSQL/prisma/client";
import { DataSchemaRepository } from "./deviceData/repository/DataSchema.repository";
import { DeviceRepository } from "./deviceData/repository/Device.repository";
import { DeviceDataRepository } from "./deviceData/repository/DeviceData.repository";
import { DeviceData } from "./deviceData/entity/DeviceData";
import { MessageReceiverConfig } from "./common/communication/receiver/MessageReceiver";
import { BaseError } from "./common/error/BaseError";
import { MessageSenderConfig } from "./common/communication/sender/MessageSender";
//import envs from envs;


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
  // const config = {
  //   id: envs("MESSAGER_ID"),
  //   brokers: envs("MESSAGER_BROKERS").split(","),
  //   topic: envs("MESSAGER_TOPIC_DEVICE_DATA"),
  // };

  const config = {
    id: process.env.MESSAGER_ID!,
    brokers: process.env.MESSAGER_BROKERS!.split(","),
    topic: process.env.MESSAGER_TOPIC_DEVICE_DATA!,
  };
  return config;
}

async function main() {
  const config = getDeviceDataTopicConfig();
  const receiver = MessageReceiverFactory.Create(config);
  await receiver.Start(messageHandler);

  await endless();
}

main()
  .then()
  .catch(errorHandler);
