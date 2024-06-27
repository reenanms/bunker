import { Injectable } from "@nestjs/common";
import { MessageSenderFactory } from "common-core/common/communication/sender/MessageSenderFactory";

export type DataToSend = {
  deviceId: string;
  data: any;
};

@Injectable()
export class AppService {
  private getConfig() {
    const config = {
      id: process.env.MESSAGER_ID,
      brokers: process.env.MESSAGER_BROKERS.split(","),
      topic: process.env.MESSAGER_TOPIC_DEVICE_DATA,
    };
    return config;
  }

  async sendData(data: DataToSend) {
    const config = this.getConfig();
    const sender = MessageSenderFactory.Create(config);

    const jsonData = JSON.stringify(data);

    console.log("Data sent:", jsonData);
    await sender.SendMessage(jsonData);
  }
}
