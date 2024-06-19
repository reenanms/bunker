import React from 'react';

import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import DeviceModelForm from './deviceModelForm'
import DeviceList from './deviceList'


class DeviceModelList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            devices: this.props.devices ?? [],
            deviceModels: this.props.deviceModels ?? [],
            schemas: this.props.schemas ?? [],
            newData: false
        }
    }

    async componentDidMount() {
    }

    deviceModelChanged(newDeviceModel, index) {
        let allDeviceModels = this.state.deviceModels;
        allDeviceModels[index] = newDeviceModel;
        this.setState({ deviceModel: allDeviceModels });
    }

    deviceModelDeleted(index) {
        let allDeviceModels = this.state.deviceModels;
        allDeviceModels.splice(index, 1);
        this.setState({ deviceModel: allDeviceModels });
    }

    addDeviceModel = _ => {
        this.setState({ newData: true });
    }

    newDeviceModelChanged(newDeviceModel) {
        let allDeviceModels = this.state.deviceModels;
        allDeviceModels.push(newDeviceModel);
        this.setState({
            deviceModel: allDeviceModels,
            newData: false
        });
    }

    renderDispositivos(deviceModel) {
        const devicesFromDeviceModel = this.state.devices.filter(e => e.deviceModelId === deviceModel.id);

        return (
            <>
                <h3>Dispositivos</h3>
                <DeviceList
                    disabled={this.state.newData}
                    deviceModelId={deviceModel.id}
                    devices={devicesFromDeviceModel} />
            </>
        );
    }

    renderDeviceModelAccordion(deviceModel,index,onChange,onCancel,onDelete) {
        return (
            <>
                <Accordion.Item key={`${index}`} eventKey={`${index}`}>
                    <Accordion.Header>
                        {index===-1 ? "<Adicionando novo>" : `${deviceModel.name}: ${deviceModel.description}`}
                    </Accordion.Header>
                    <Accordion.Body>
                        <Row>
                            <Col>
                                <DeviceModelForm
                                    value={deviceModel}
                                    onChange={onChange}
                                    onCancel={onCancel}
                                    onDelete={onDelete}
                                    newData={index===-1}
                                    schemas={this.state.schemas} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {this.renderDispositivos(deviceModel)}
                            </Col>
                        </Row>
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
            name: "",
            description: ""
        };

        return (
            <>
                {this.renderDeviceModelAccordion(newDeviceModel,
                                                 -1,
                                                 e => this.newDeviceModelChanged(e.target.value),
                                                 () => this.setState({ newData: false }),
                                                 () => {})}
            </>
        );
    }

    render() {
        return (
            <>
                <Row>
                    <Col>
                        <Button variant="primary"
                                style={{float: 'right'}}
                                disabled={this.props.disabled}
                                onClick={this.addDeviceModel}>Adicionar modelo de dispositivo</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Accordion alwaysOpen defaultActiveKey={['-1']}>
                            {this.state.deviceModels.map((deviceModel,index) =>
                                        this.renderDeviceModelAccordion(deviceModel,
                                                                        index,
                                                                        e => this.deviceModelChanged(e.target.value, index),
                                                                        () => {},
                                                                        e => this.deviceModelDeleted(index)))}
                            {this.renderNewDeviceModelAccordion()}
                        </Accordion>
                    </Col>
                </Row>
            </>
        );
    }
}

export default DeviceModelList;
