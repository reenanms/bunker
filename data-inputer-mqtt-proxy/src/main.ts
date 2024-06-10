import { IClientOptions, IPublishPacket, MqttClient, OnMessageCallback, connect } from "mqtt"
import { MessageSenderFactory } from "common-core/common/communication/sender/MessageSenderFactory";
import { MessageSenderConfig } from "common-core/common/communication/sender/MessageSender";
import envs from "dotenv";

export type MqttWrapperConfig = {
  clientId: string;
  serverURL: string;
  username?: string;
  password?: string;
};

export type MqttMessageCallback = (message: string) => void;

class MqttWrapper {
  private client : MqttClient | null = null;
  private topicsSubstriptions = new Map<string, MqttMessageCallback[]>();

  constructor(readonly config: MqttWrapperConfig) {};

  private getUndefinedOrAValidStringValue(value: string | undefined) : string | undefined {
    if (!value)
      return undefined;

    if (value.trim() == "")
      return undefined;

      return value;
  }

  public connect() {
    const options : IClientOptions = {
      clean: false,
      connectTimeout: 4000, 
      clientId: this.config.clientId,
      username: this.getUndefinedOrAValidStringValue(this.config.username),
      password: this.getUndefinedOrAValidStringValue(this.config.password),
    }

    this.client = connect(this.config.serverURL, options);
    const substriptions = this.topicsSubstriptions;
    this.client.on("message", (topic, payload, packet) => this.onMessages(substriptions, topic, payload, packet));
  }

  private onMessages(substriptions: Map<string, MqttMessageCallback[]>, topic: string, payload: Buffer, packet: IPublishPacket) {
    const message = payload.toString();
    const topicCallbacks = substriptions[topic];
    for(let callback of topicCallbacks)
      callback(message);
  }

  public end() {
    this.client?.end();
  }

  public sendMenssage(topic: string, message: string) {
    this.client?.publish(topic, message);
  }

  public subscribeTopic(topic: string, callback: MqttMessageCallback) {
    if (!this.topicsSubstriptions.has(topic))
      this.topicsSubstriptions[topic] = [];

    this.client?.subscribe(topic, function (err) {
      if (err)
        console.error(err)
    });

    this.topicsSubstriptions[topic].push(callback);
  }
}

function getMqttConfig(): MqttWrapperConfig {
  const config = {
    clientId: process.env.MQTT_ID!,
    serverURL: process.env.MQTT_URL!,
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
  }
  return config;
}

function getMessagerConfig(): MessageSenderConfig {
  const config = {
    id: process.env.MESSAGER_ID!,
    brokers: process.env.MESSAGER_BROKERS!.split(","),
    topic: process.env.MESSAGER_TOPIC_DEVICE_DATA!,
  };
  return config;
}

export type DataToSend = {
  deviceId: string;
  data: any;
};

async function sendMessagerData(data: DataToSend) {
  const config = getMessagerConfig();
  const sender = MessageSenderFactory.Create(config);

  const jsonData = JSON.stringify(data);

  console.log("Data sent:", jsonData);
  await sender.SendMessage(jsonData);
}

async function endless() {
  while (true) await new Promise((r) => setTimeout(r, 100));
}

async function main() {
  envs.config();

  const mqttConfig = getMqttConfig();
  const mqttClient = new MqttWrapper(mqttConfig);

  try
  {
    mqttClient.connect();

    const topicDeviceData = process.env.MQTT_TOPIC_DEVICE_DATA!;
    mqttClient.subscribeTopic(topicDeviceData, (message) => {
      const splittedMessage = message.split(":");
      if (splittedMessage.length != 2)
        return;

      const deviceId = splittedMessage[0];
      const data = splittedMessage[1].trimStart();
      const dataToSend = { deviceId, data };

      sendMessagerData(dataToSend);
    });

    await endless();
  }
  catch (e) {
    console.error(e);
  }
  
  mqttClient.end()
}

main()
  .then()
  .catch();
