import { Kafka, Consumer } from 'kafkajs';
import { MessageReceiver } from './MessageReceiver';


export class KafkaMessageReceiver implements MessageReceiver {
	private kafka: Kafka;
	private topic: string;
	private consumer: Consumer;

	constructor(id: string, brokers: string[], topic: string) {
		this.kafka = new Kafka({
			clientId: id,
			brokers: brokers,
		});
		this.consumer = this.kafka.consumer({ groupId: topic /*, partitionAssigners: undefined*/ });;
		this.topic = topic;
	}

	async Start(callback: (message: string) => void): Promise<void> {
		//https://github.com/tulios/kafkajs/issues/260
		await this.consumer.connect();
		await this.consumer.subscribe({ topic: this.topic, fromBeginning: true });
		await this.consumer.run({
			eachMessage: async ({ message }) => callback(`${message.value}`)
		}
		);
	}

	async Stop(): Promise<void> {
		{
			await this.consumer.disconnect();
		}
	}
}
