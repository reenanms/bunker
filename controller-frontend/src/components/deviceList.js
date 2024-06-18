import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import authService from '../services/auth.service'
import deviceService from '../services/device.service'


class DeviceList extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      devices: this.props.devices ?? []
    }
  }

  renderItem(device, index) {
    return (
      <>
        <Accordion.Item key={index} eventKey={`${index}`}>
          <Accordion.Header>{device.id}</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
      </>
    )
  }

  addDevice = async _ => {
    const newData = {
      id: crypto.randomUUID(),
      deviceModelId: this.props.deviceModelId
    };

    const token = authService.getToken();
    await deviceService.createDevice(token, ...Object.values(newData));

    let devices = this.state.devices;
    devices.push(newData);
    this.setState({ devices });
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
              <Accordion flush>
                {this.state.devices.map(this.renderItem)}
              </Accordion>
            </Col>
          </Row>
        </>
    );
  }
}

export default DeviceList;
