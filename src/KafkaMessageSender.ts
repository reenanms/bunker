import { Kafka, Partitioners } from 'kafkajs';
import { MessageSender } from './MessageSender';


export class KafkaMessageSender implements MessageSender {
	private kafka: Kafka;
	private topic: string;

	constructor(id: string, brokers: string[], topic: string) {
		this.kafka = new Kafka({
			clientId: id,
			brokers: brokers,
		});
		this.topic = topic;
	}

	async SendMessage(message: string): Promise<void> {
		const producer = this.kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner });

		await producer.connect();
		await producer.send({
			topic: this.topic,
			messages: [
				{ value: message },
			],
		});
		await producer.disconnect();
	}
}
