import { KafkaMessageSender } from './KafkaMessageSender';
import { MessageSender } from './MessageSender';


export class MessageSenderFactory {
	static Create(id: string, brokers: string[], topic: string): MessageSender {
		return new KafkaMessageSender(id, brokers, topic);
	}
}
