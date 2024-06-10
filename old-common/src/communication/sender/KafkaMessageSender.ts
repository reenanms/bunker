import { Kafka, Partitioners } from "kafkajs";
import { MessageSender, MessageSenderConfig } from "./MessageSender";

export class KafkaMessageSender implements MessageSender {
  private kafka: Kafka;
  private topic: string;

  constructor(config: MessageSenderConfig) {
    this.kafka = new Kafka({
      clientId: config.id,
      brokers: config.brokers,
    });
    this.topic = config.topic;
  }

  async SendMessage(message: string): Promise<void> {
    const producer = this.kafka.producer({
      createPartitioner: Partitioners.DefaultPartitioner,
    });

    await producer.connect();
    await producer.send({
      topic: this.topic,
      messages: [{ value: message }],
    });
    await producer.disconnect();
  }
}
