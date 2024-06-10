import { Kafka, Consumer } from "kafkajs";
import { MessageReceiver, MessageReceiverConfig } from "./MessageReceiver";

export class KafkaMessageReceiver implements MessageReceiver {
  private kafka: Kafka;
  private config: MessageReceiverConfig;
  private consumer: Consumer;

  constructor(config: MessageReceiverConfig) {
    this.kafka = new Kafka({
      clientId: config.id,
      brokers: config.brokers,
    });
    this.consumer = this.kafka.consumer({
      groupId: config.topic /*, partitionAssigners: undefined*/,
    });
    this.config = config;
  }

  async Start(
    callback: (config: MessageReceiverConfig, message: string) => void,
  ): Promise<void> {
    //https://github.com/tulios/kafkajs/issues/260
    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: this.config.topic,
      fromBeginning: false,
    });
    await this.consumer.run({
      eachMessage: async ({ message, heartbeat }) => {
        await callback(this.config, `${message.value}`);
        await heartbeat();
      },
    });
  }

  async Stop(): Promise<void> {
    {
      await this.consumer.disconnect();
    }
  }
}
