import React from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table';

import AuthRedirector from '../components/authRedirector'

import authService from '../services/auth.service'
import deviceService from '../services/device.service'
import deviceModelService from '../services/deviceModel.service'


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

            deviceData: null,
            deviceDataLoaded: false,
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

    async loadDeviceData(token) {
        try {
            const deviceData = await deviceService.getDeviceData(token, this.state.deviceId);
            this.setState({ deviceData });
        }
        catch (e) {
            console.error(e)
        }
        
        this.setState({ deviceDataLoaded: true });
    }

    async componentDidMount() {
        const token = await authService.getToken();

        await this.loadDeviceAndDeviceModel(token);
        await this.loadDeviceTokens(token);
        await this.loadDeviceData(token);
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

    renderDeviceData() {
        if (!this.state.deviceDataLoaded) {
            return (<>Carregando dados...</>);
        }

        return (
            <>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th># Dados</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.deviceData.map((data, index) =>
                            <>
                                <tr key={`${index}`}>
                                    <td><code>{JSON.stringify(data)}</code></td>
                                </tr>
                            </>
                        )}
                    </tbody>
                    
                </ Table>
            </>
        )
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

        const apiUrl = process.env.REACT_APP_BACKEND_URL;

        return (
            <>
                <AuthRedirector redirectTo="/" />

                <h2>Página do Dispositivo</h2>
            
                <h3>Informações do Dispositivo</h3>
                <ul>
                    <li>Identificado: {this.state.device.id}</li>
                    <li>Nome: {this.state.device.name}</li>
                    <li>Modelo de dado: {this.state.device.schemaName}</li>
                </ul>

                <h3>Envio de Dados</h3>
                <p>Você pode enviar dados do seu dispositivo para o Bunker usando dois protocolos diferentes: REST ou MQTT.</p>

                <h4>Envio via Protocolo MQTT</h4>
                <ol>
                    <li>Conecte-se ao broker MQTT usando as seguintes informações:
                    <ul>
                        <li>URL: {inputerMqttUrl}</li>
                        { inputerMqttUrlUser && <li>Usuário:{inputerMqttUrlUser}</li> }
                        { inputerMqttUrlPassword && <li>Senha:{inputerMqttUrlPassword}</li> }
                        <li>Tópico: {inputerMqttUrlTopic}</li>
                    </ul>
                    </li>
                    <li>Envie os dados no formato <code>ID_DISPOSITIVO:DADO_A_SER_ENVIADO_AO_DISPOSITIVO</code>.
                    <ul>
                        <li>Exemplo: <code>{this.state.deviceId}:999</code></li>
                    </ul>
                    </li>
                    <li>Certifique-se de enviar o dado no formato correto, de acordo com o modelo do seu dispositivo ({this.state.deviceModel.schemaName}).</li>
                </ol>

                <h4>Envio via Protocolo REST</h4>
                <ol>
                    <li>Gere um token de acesso para autenticação.</li>
                    <li>Faça um POST em {inputerRestFullUrl}, passando o Bearer Token e o dado no formato correto, conforme o modelo do seu dispositivo ({this.state.deviceModel.schemaName}).</li>
                </ol>
                <p>Atenção: Caso o dado não esteja no formato correto, ele será reprovado na validação e descartado.</p>

                <h4>Tokens Gerados</h4>
                <ul>
                    {this.state.deviceTokens.map((token) => (
                        <li><div key={token} style={{ wordWrap: 'break-word' }}>{token}</div></li>
                    ))}
                </ul>
                <Button onClick={this.generateNewDeviceToken}>Clique aqui para gerar um novo token.</Button>

                <h3>Consulta de Dados do Dispositivo</h3>
                <p>Para buscar os dados do seu dispositivo, use o protocolo REST:</p>
                <ol>
                    <li>Obtenha um token de acesso:
                    <ul>
                        <li>URL: POST {apiUrl}/auth</li>
                        <li>Body: <code>{"{"} "username": &lt;username&gt;, "password": &lt;password&gt; {"}"}</code></li>
                    </ul>
                    </li>
                    <li>Use o token para acessar a rota de consulta de dados:
                    <ul>
                        <li>URL: GET {apiUrl}/device/{this.state.device.id}/data</li>
                    </ul>
                    </li>
                </ol>
                
                <h3>Dados do Dispositivo</h3>
                {this.renderDeviceData()}
            </>
        )
    }
}

export default withMatchProp(Device);