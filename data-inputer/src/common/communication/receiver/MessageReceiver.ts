export type MessageReceiverConfig = {
  id: string;
  brokers: string[];
  topic: string;
};

export interface MessageReceiver {
  Start(
    callback: (config: MessageReceiverConfig, message: string) => void,
  ): Promise<void>;
  Stop(): Promise<void>;
}
