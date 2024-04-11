import { KafkaMessageSender } from './KafkaMessageSender';
import { MessageSender, MessageSenderConfig } from './MessageSender';


export class MessageSenderFactory {
	static Create(config: MessageSenderConfig): MessageSender {
		return new KafkaMessageSender(config);
	}
}
