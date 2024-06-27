import React from 'react';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import authService from '../services/auth.service'
import deviceService from '../services/device.service'

import { uid } from 'uid';


class DeviceList extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      devices: this.props.devices ?? []
    }
  }

  addDevice = async _ => {
    const dataToSend = {
      name: uid(),
      deviceModelId: this.props.deviceModelId
    };

    const token = authService.getToken();
    const newData = await deviceService.createDevice(token, ...Object.values(dataToSend));

    let devices = this.state.devices;
    devices.push(newData);
    this.setState({ devices });
  }

  renderItem(device, index) {
    return (
      <>
        <Row key={index} style={{ verticalAlign: 'bottom' }}>
          <Col>
            <p>
              <b>{device.name}</b>
              <Link
                  style={{float: 'right'}}
                  to={{ pathname: `/device/${device.id}` }}>
                  Ver detalhes
              </Link>
            </p>
          </Col>
        </Row>
      </>
    )
  }

  render() {
    return (
        <>
          <Row>
            <Col>
                <Button variant="primary"
                        style={{float: 'right'}}
                        disabled={this.props.disabled}
                        onClick={this.addDevice}>Adicionar dispositivo</Button>
            </Col>
          </Row>
          <Row>
            <Col>
                {this.state.devices.map((d,i) => this.renderItem(d,i))}
            </Col>
          </Row>
        </>
    );
  }
}

export default DeviceList;
