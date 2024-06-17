import React from 'react';

import authService from '../services/auth.service'
import deviceService from '../services/device.service'
import deviceModelService from '../services/deviceModel.service'
import schemaService from '../services/schema.service'

import AuthRedirector from '../components/authRedirector'

import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import DeviceModelForm from '../components/deviceModelForm'


class Schema extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            devices: [],
            devicesLoaded: false,

            deviceModels: [],
            deviceModelsLoaded: false,

            schemas: [],
            schemasLoaded: false,

            newData: null
        }
    }

    async loadDeviceModels(token) {
        try {
            const deviceModels = await deviceModelService.getAllDeviceModels(token);
            this.setState({ deviceModels });
        }
        catch (e) {
            console.error(e)
        }
        
        this.setState({ deviceModelsLoaded: true });
    }

    async loadDevices(token) {
        try {
            const devices = await deviceService.getAllDevices(token);
            this.setState({ devices });
        }
        catch (e) {
            console.error(e)
        }
        
        this.setState({ devicesLoaded: true });
    }

    async loadSchemas(token) {
        try {
            const schemas = await schemaService.getAllSchemas(token);
            this.setState({ schemas });
        }
        catch (e) {
            console.error(e)
        }
        
        this.setState({ schemasLoaded: true });
    }

    async componentDidMount() {
        const token = await authService.getToken();

        await this.loadDeviceModels(token);
        await this.loadDevices(token);
        await this.loadSchemas(token);
    }

    isLoaded() {
        if (!this.state.devicesLoaded)
            return false;

        if (!this.state.deviceModelsLoaded)
            return false;

        if (!this.state.schemasLoaded)
            return false;

        return true;
    }

    deviceModelChanged(newDeviceModel, index) {
        let allDeviceModels = this.state.deviceModels;
        allDeviceModels[index] = newDeviceModel;
        this.setState({ deviceModel: allDeviceModels });
    }

    addDeviceModel = _ => {
        this.setState({ newData: true });
    }

    renderDeviceModelAccordion(deviceModel,index,onChange) {
        return (
            <>
                <Accordion.Item key={index} eventKey={`${index}`}>
                    <Accordion.Header>
                        {deviceModel.id}: {deviceModel.description}
                    </Accordion.Header>
                    <Accordion.Body>
                        <Container>
                            <Row>
                                <Col>
                                    <DeviceModelForm
                                        value={deviceModel}
                                        onChange={onChange}
                                        newData={index===-1}
                                        schemas={this.state.schemas} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>Lista de dispositivos:</Col>
                            </Row>
                            <Row>
                                <Col>
                                    DEVICE LISTS
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button style={{float: 'right'}}
                                            variant="primary">Adicionar dispositivo</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Accordion.Body>
                </Accordion.Item>
            </>
        );
    }

    renderNewDeviceModelAccordion() {

        if (!this.state.newData)
            return (
                <></>
            );

        const newDeviceModel = {
            id: crypto.randomUUID(),
            description: ""
        };

        return (
            <>
                {this.renderDeviceModelAccordion(newDeviceModel, -1, e => this.deviceModelChanged(e.target.value, -1))}
            </>
        )
    }

    render() {
        if (!this.isLoaded())
            return (
                <></>
            );

        return (
            <>
                <AuthRedirector redirectTo="/" />

                <div>
                    <p>MEU DISPOSITIVOS</p>
                </div>

                <Accordion alwaysOpen defaultActiveKey={['-1']}>
                    {this.state.deviceModels.map((deviceModel,index) => this.renderDeviceModelAccordion(deviceModel, index, e => this.deviceModelChanged(e.target.value, index)))}
                    {this.renderNewDeviceModelAccordion()}
                </Accordion>
                <Button variant="primary"
                        style={{float: 'right'}}
                        onClick={this.addDeviceModel}>Adicionar modelo de dispositivo</Button>
            </>
        )
    }
}

export default Schema;