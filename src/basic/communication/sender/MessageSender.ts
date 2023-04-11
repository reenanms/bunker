export interface MessageSender {
	SendMessage(message: string) : Promise<void>;
}
