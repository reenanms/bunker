import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import CloseButton from  'react-bootstrap/CloseButton'

import ChartConfigForm from '../components/chartConfigForm'

import authService from '../services/auth.service'
import userService from '../services/user.service'
import deviceModelService from '../services/deviceModel.service'
import deviceService from '../services/device.service'
import schemaService from '../services/schema.service'
import dashboardService from '../services/dashboard.service'


class DashboardBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            userLoaded: false,

            chartTypes: null,
            chartTypesLoaded: true,
            
            isNew: true,
            config: [],
            configLoaded: false,

            devices: null,
            devicesLoaded: false,

            deviceModels: null,
            deviceModelsLoaded: false,

            schemasFields: null,
            schemasFieldsLoaded: false,

            devicesToSelect: null,
            mapDeviceSchemas: null,
        }
    }

    async loadUser(token) {
        try {
            const user = await userService.getUser(token);
            
            this.setState({
                user,
                userLoaded: true
            });
        }
        catch (e) {
            console.error(e)
        }
    }

    async loadChartTypes() {
        const chartTypes = [
            { value: "LINE", name: "Linha" },
            { value: "BAR", name: "Barra" },
            { value: "AREA", name: "Área" },
            //{ value: "MAP", name: "Mapa" },
        ];

        this.setState({
            chartTypes,
            chartTypesLoaded: true
        });
    }

    async loadConfig(token) {
        try {
            const dashboardConfig = await dashboardService.getDashboardConfig(token)
            const config = dashboardConfig.config;
         
            this.setState({
                isNew: false,
                config,
            });
        }
        catch (e) {
            console.error(e)
        }

        this.setState({ configLoaded: true });
    }

    async getSchemaFields(token, schemaName) {
        let fields = []
        try {
            fields = await schemaService.getSchemaFields(token, schemaName);
        }
        catch (e) {
            console.error(e)
        }

        return {
            schemaName,
            fields
        };
    }

    async loadDeviceModelsAndSchemasFields(token) {
        try {
            const deviceModels = await deviceModelService.getAllDeviceModels(token);
            const devices = await deviceService.getAllDevices(token);
            
            const schemaNames = deviceModels.map(e => e.schemaName);
            const schemaNamesDistinct = new Set(schemaNames);
            
            let schemasFields = {};
            for (const schemaName of schemaNamesDistinct) {
                const fields = await this.getSchemaFields(token, schemaName);
                schemasFields[schemaName] = fields;
            }

            this.loadDevicesToSelect(deviceModels, devices);

            this.setState({    
                devices,
                devicesLoaded: true,

                deviceModels,
                deviceModelsLoaded: true,

                schemasFields,
                schemasFieldsLoaded: true
            });
        }
        catch (e) {
            console.error(e)
        }
    }

    async componentDidMount() {
        const token = await authService.getToken();

        await this.loadUser(token);
        await this.loadChartTypes();
        await this.loadConfig(token);
        await this.loadDeviceModelsAndSchemasFields(token);
    }

    loadDevicesToSelect(allDeviceModels, allDevices) {
        let devicesToSelect = [];
        let mapDeviceSchemas = [];

        for(const deviceModel of allDeviceModels) {
            const devices = allDevices.filter(e => e.deviceModelId === deviceModel.id);

            for(const device of devices) {
                devicesToSelect.push({
                    value: device.id,
                    name: `${deviceModel.name}: ${device.name}`
                });

                mapDeviceSchemas[device.id] = deviceModel.schemaName;
            }
        }

        this.setState({    
            devicesToSelect,
            mapDeviceSchemas
        });
    }

    newState(setNewValue) {
        let newState = { ...this.state };
        setNewValue(newState);
        this.setState(newState);
    }

    renderCard(data, rowIndex, columnIndex) {
        return (
            <>
                <Card style={{ width: '18rem' }}>
                  <Card.Body>
                    <CloseButton style={{ float: 'right' }} onClick={_ => this.removeData(rowIndex, columnIndex)} />
                    <Card.Title>Gráfico</Card.Title>
                    <ChartConfigForm value={data}
                                     row={rowIndex}
                                     column={columnIndex}
                                     chartTypes={this.state.chartTypes}
                                     schemasFields={this.state.schemasFields}
                                     devices={this.state.devicesToSelect}
                                     mapDeviceSchemas={this.state.mapDeviceSchemas}
                                     onChange={e => this.newState(s => s.config[rowIndex][columnIndex] = e.target.value)} />
                  </Card.Body>
                </Card>
            </>
        );
    }

    removeData(rowIndex, columnIndex) {
        this.newState(s => {
            s.config[rowIndex].splice(columnIndex, 1);
            if (s.config[rowIndex].length === 0)
                s.config.splice(rowIndex, 1);
        });
    }

    addNewColumn(rowIndex) {
        const newRegister = {
            colletion: "DeviceData",
            filter: {"deviceId": { "$eq": null } },
            chartDefinition: {
                x: {},
                y: {}
            }
        }

        this.newState(s => s.config[rowIndex].push(newRegister));
    }

    addNewRow() {
        this.newState(s => s.config.push([]));
        this.addNewColumn(this.state.config.length - 1)
    }

    renderButtonAdd(tooltipMessage, placement, style, onClick) {
        return (
            <>
                <OverlayTrigger
                    placement={placement}
                    delay={{ show: 250, hide: 400 }}
                    overlay={props => (
                        <Tooltip id="button-tooltip" {...props}>
                          {tooltipMessage}
                        </Tooltip>
                      )} >
                    <Button
                        variant="outline-secondary"
                        style={style}
                        onClick={onClick}>+</Button>
                </OverlayTrigger>
            </>
        )
    }
    
    renderColumns(columns, rowIndex) {
        return (
            <>
                <div style={{display: 'inline-flex'}}>
                    {columns.map((data, columnIndex) => 
                        <div>
                            {this.renderCard(data, rowIndex, columnIndex)}
                        </div>
                    )}
                    <div>
                        {this.renderButtonAdd(
                                "Adicionar coluna",
                                "right",
                                { height: "100%" },
                                _ => this.addNewColumn(rowIndex))}
                    </div>
                </div>
            </>
        );
    }

    renderRows(rows) {
        return (
            <>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {rows.map((columns, rowIndex) => this.renderColumns(columns, rowIndex))}
                    {this.renderButtonAdd(
                            "Adicionar linha",
                            "bottom",
                            { width: "100%" },
                            _ => this.addNewRow())}
                </div>
            </>
        );
    }

    isLoaded() {
        if (!this.state.userLoaded)
            return false;

        if (!this.state.chartTypesLoaded)
            return false;

        if (!this.state.configLoaded)
            return false;

        if (!this.state.devicesLoaded)
            return false;

        if (!this.state.deviceModelsLoaded)
            return false;

        if (!this.state.schemasFieldsLoaded)
            return false;

        return true;
    }

    sendConfigData = async _ => {
        const token = authService.getToken();
        if (this.state.isNew)
            await dashboardService.createDashboardConfig(token, this.state.config);
        else
            await dashboardService.updateDashboardConfig(token, this.state.config);

        this.setState({ isNew: false });
        this.props.onSave();
    }

    redirectToConfig() {
        this.setState({redirectTo: "/dashboard/config" })
    }

    render() {
        if (!this.isLoaded()) {
            return ( <></> );
        }

        console.log("this.state...", this.state)
        
        return (
            <>
                <Row>
                    <Col>
                        {this.renderRows(this.state.config)}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant="primary"
                                style={{float: 'right'}}
                                onClick={this.sendConfigData}>
                            Savar configuração
                        </Button>
                        <Button variant="secondary"
                                style={{float: 'right'}}
                                onClick={_ => this.props.onCancel()}>
                            Cancelar
                        </Button>  
                    </Col>
                </Row>
            </>
        );
    }
}

export default DashboardBuilder;