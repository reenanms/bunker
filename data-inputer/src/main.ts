import 'reflect-metadata';

import * as register from "common-core/register";
import * as resolver from "common-core/resolver";

import { MessageReceiverFactory } from "common-core/common/communication/receiver/MessageReceiverFactory";
import { CreateDeviceDataUseCase } from "common-core/deviceData/useCase/CreateDeviceData.usecase";
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

  try {
    const createDeviceDataUseCase = resolver.resolve(CreateDeviceDataUseCase);
    const deviceData: DeviceData = JSON.parse(message);
    await createDeviceDataUseCase.run(deviceData);

    console.log(`Success on topic ${config.topic}`, deviceData);
  } catch (error) {
    errorHandler(error);
  }
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
  await register.init();
  
  const config = getDeviceDataTopicConfig();
  const receiver = MessageReceiverFactory.Create(config);
  await receiver.Start(messageHandler);

  await endless();
}

main()
  .then()
  .catch(errorHandler);
