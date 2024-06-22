import React from 'react';
import { useParams } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

import AuthRedirector from '../components/authRedirector'

import authService from '../services/auth.service'
import deviceService from '../services/device.service'
import deviceModelService from '../services/deviceModel.service'
//import schemaService from '../services/schema.service'



function withMatchProp(WrappedComponent) {
    return function WithMatchProp(props) {
      const match = useParams();
      return <WrappedComponent match={match} {...props} />;
    };
  }

class Device extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            deviceId: this.props.match.deviceId,

            device: null,
            deviceLoaded: false,

            deviceModel: null,
            deviceModelLoaded: false,

            deviceTokens: null,
            deviceTokensLoaded: false,
        }
    }

    async loadDeviceAndDeviceModel(token) {
        try {
            const device = await deviceService.getDevice(token, this.state.deviceId);
            const deviceModel = await deviceModelService.getDeviceModel(token, device.deviceModelId);

            this.setState({
                device,
                deviceModel
            });
        }
        catch (e) {
            console.error(e)
        }
        
        this.setState({
            deviceLoaded: true,
            deviceModelLoaded: true
        });
    }

    async loadDeviceTokens(token) {
        try {
            const deviceTokens = await deviceService.getDeviceTokens(token, this.state.deviceId);
            this.setState({ deviceTokens });
        }
        catch (e) {
            console.error(e)
        }
        
        this.setState({ deviceTokensLoaded: true });
    }

    async componentDidMount() {
        const token = await authService.getToken();

        await this.loadDeviceAndDeviceModel(token);
        await this.loadDeviceTokens(token);
    }

    generateNewDeviceToken = async _ => {
        const token = await authService.getToken();
        const deviceToken = await authService.authenticateDevice(token, this.state.deviceId);

        let deviceTokens = this.state.deviceTokens;
        deviceTokens.push(deviceToken.token);

        this.setState({ deviceTokens })
    }

    isLoaded() {
        if (!this.state.deviceLoaded)
            return false;

        if (!this.state.deviceModelLoaded)
            return false;

        if (!this.state.deviceTokensLoaded)
            return false;
        
        return true;
    }

    render() {
        if (!this.isLoaded()) {
            return (<></>);
        }

        const inputerRestUrl = process.env.REACT_APP_INPUTER_REST_URL;
        const inputerRestFullUrl = `${inputerRestUrl}/data`;

        const inputerMqttUrl = process.env.REACT_APP_INPUTER_MQTT_URL;
        const inputerMqttUrlUser = process.env.REACT_APP_INPUTER_MQTT_USER;
        const inputerMqttUrlPassword = process.env.REACT_APP_INPUTER_MQTT_PASSWORD;
        const inputerMqttUrlTopic = process.env.REACT_APP_INPUTER_MQTT_TOPIC;

        return (
            <>
                <AuthRedirector redirectTo="/" />
                
                <h2>Dispositivo {this.state.device.name}</h2>

                <p>
                    Para enviar dados do seu disposivo para o Bunker, você tem duas opções de protocolo: REST ou MQTT.
                    Para ambas as opções, caso você ainda esteja começando e não possua um dispositivo já funcionando, pode utilizar clients dele para fazer o envio de dado. Você pode instalar as applicações clientes ou utilizat online, como o <a href='https://reqbin.com/'>ReqBin</a> para REST e o <a href='https://www.hivemq.com/demos/websocket-client/'>HiveMQ</a> pata MQTT.
                </p>

                <hr />

                <div>
                    <h4>Dados para envio via protocolo MQTT</h4>
                    <p>
                        Para usar o protocolo MQTT você precisa se conectar ao broken e depois enviar os dados.
                        User a seguinte informação para conectar no broken:
                    </p>

                    <ul>
                        <li key="url">URL: {inputerMqttUrl}</li>
                        <li key="user">Usuário: {inputerMqttUrlUser}</li>
                        <li key="password">Senha: {inputerMqttUrlPassword}</li>
                        <li key="topic">Topic: {inputerMqttUrlTopic}</li>
                    </ul>

                    <p>
                        O formato do dado a ser enviado no tópico dever ser sempre ID_DISPOSITIVO:DADO_A_SER_ENVIADO_AO_DISPOSITIVO.
                        Case seu dispositivo receber um dado inteiro, número 999, o corpo será: <i>{this.state.deviceId}:999</i>.
                        O formato configurado no seu modelo de dipositivo é ({this.state.deviceModel.schemaName}), não esqueça de mandar o dado no formato correto, caso contrário ele será descartado.
                    </p>

                </div>

                <hr />

                <div>
                    <h4>Dados para envio via protocolo REST</h4>
                    <p>
                        Para usar o protocolo REST você precisa de um token gerado para passar na validação.
                        Depois disso basta fazer um POST em {inputerRestFullUrl}, passando o Bearer Token e o dado no formato configurado no seu modelo de dipositivo, ({this.state.deviceModel.schemaName}), em um formato correto.
                        Lembre-se caso o dado não estaja no formato correto, ele será reprovado na validação e descartado.
                    </p>

                    <h6>Lista de tokens gerados</h6>
                    <ListGroup as="ol" numbered>
                        {this.state.deviceTokens.map((token) =>
                            <>
                                <ListGroup.Item key={token} as="li" style={{ wordWrap: 'break-word' }}>{token}</ListGroup.Item>
                            </>
                        )}
                    </ListGroup>
                    <div style={{float: 'right'}}>Precisa de mais um novo token? <Button variant="link" onClick={this.generateNewDeviceToken}>Clique aqui para gerar.</Button></div>
                </div>
            </>
        )
    }
}

export default withMatchProp(Device);