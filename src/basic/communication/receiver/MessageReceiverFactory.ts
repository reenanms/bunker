import { KafkaMessageReceiver } from './KafkaMessageReceiver';
import { MessageReceiver } from './MessageReceiver';


export class MessageReceiverFactory {
	static Create(id: string, brokers: string[], topic: string): MessageReceiver {
		return new KafkaMessageReceiver(id, brokers, topic);
	}
}
