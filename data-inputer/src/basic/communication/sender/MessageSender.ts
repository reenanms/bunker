export type MessageSenderConfig = {
	id: string,
	brokers: string[],
	topic: string
}
export interface MessageSender {
	SendMessage(message: string) : Promise<void>;
}
