/****
#create
docker exec broker kafka-topics --bootstrap-server broker:9092 --create --topic quickstart

#send
docker exec --interactive --tty broker kafka-console-producer --bootstrap-server broker:9092 --topic quickstart

#receive
docker exec --interactive --tty broker kafka-console-consumer --bootstrap-server broker:9092 --topic quickstart --from-beginning
****/


import { MessageSenderFactory } from "./sender/MessageSenderFactory";
import { MessageReceiverFactory } from "./receiver/MessageReceiverFactory";


const config = {
  id: 'bunker',
  brokers: ['localhost:9092'],
  topic: "quickstart"
}

const sender = MessageSenderFactory.Create(config.id, config.brokers, config.topic);
await sender.SendMessage('Test message 1!');
await sender.SendMessage('Test message 2!');
await sender.SendMessage('Test message 3!');


const receiver = MessageReceiverFactory.Create(config.id, config.brokers, config.topic);
await receiver.Start( m => console.log(`received: ${m}`));


