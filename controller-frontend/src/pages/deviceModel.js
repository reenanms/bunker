import React from 'react';

import authService from '../services/auth.service'
import deviceService from '../services/device.service'
import deviceModelService from '../services/deviceModel.service'
import schemaService from '../services/schema.service'

import AuthRedirector from '../components/authRedirector'
import DeviceModelList from '../components/deviceModelList'


class DeviceModel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            devices: [],
            devicesLoaded: false,

            deviceModels: [],
            deviceModelsLoaded: false,

            schemas: [],
            schemasLoaded: false,

            newData: false
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

    render() {
        if (!this.isLoaded())
            return (<></>);

        return (
            <>
                <AuthRedirector redirectTo="/" />

                <h2>Modelos de dispositivo</h2>

                <DeviceModelList
                    devices={this.state.devices}
                    deviceModels={this.state.deviceModels}
                    schemas={this.state.schemas}/>
            </>
        )
    }
}

export default DeviceModel;
