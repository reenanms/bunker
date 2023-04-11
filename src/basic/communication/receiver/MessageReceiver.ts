export interface MessageReceiver {
	Start(callback: (message: string) => void) : Promise<void>;
	Stop() : Promise<void>;
}
