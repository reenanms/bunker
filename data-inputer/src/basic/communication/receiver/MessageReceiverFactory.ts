import { KafkaMessageReceiver } from './KafkaMessageReceiver';
import { MessageReceiver, MessageReceiverConfig } from './MessageReceiver';

export class MessageReceiverFactory {
	static Create(config: MessageReceiverConfig): MessageReceiver {
		return new KafkaMessageReceiver(config);
	}
}
