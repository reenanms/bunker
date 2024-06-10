import { MessageSender, MessageSenderConfig } from "./MessageSender";
export declare class KafkaMessageSender implements MessageSender {
    private kafka;
    private topic;
    constructor(config: MessageSenderConfig);
    SendMessage(message: string): Promise<void>;
}
//# sourceMappingURL=KafkaMessageSender.d.ts.map