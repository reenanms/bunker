import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

import authService from '../services/auth.service'
import deviceService from '../services/device.service'

import { uid } from 'uid';


class DeviceList extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      devices: this.props.devices ?? [],
      deviceTokens: []
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

  generateToken = async deviceId => {
    const token = authService.getToken();
    const deviceToken = await authService.authenticateDevice(token, deviceId);
    let deviceTokens = this.state.deviceTokens;
    deviceTokens.push(deviceToken);
    this.setState({ deviceTokens })
  }

  renderDeviceInfos(device, deviceTokens) {
    return (
      <>
        <Row>
          <Col>
          Para enviar dados para seu device, você vai precisar gerar o token de acesso.
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="primary"
                      style={{float: 'right'}}
                      onClick={async _ => this.generateToken(device.id)}>Gerar token</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroup as="ol" numbered>
              {deviceTokens.map((token) =>
                  <>
                    <ListGroup.Item as="li" style={{ wordWrap: 'break-word' }}>{token.token}</ListGroup.Item>
                  </>
                )}
            </ListGroup>
          </Col>
        </Row>
      </>
    );
  }

  renderItem(device, index) {
    const deviceTokens = this.state.deviceTokens.filter(t=> t.deviceId === device.id);

    return (
      <>
        <Accordion.Item key={`${index}`} eventKey={`${index}`}>
          <Accordion.Header>{device.name}</Accordion.Header>
          <Accordion.Body>
            {this.renderDeviceInfos(device, deviceTokens)}
          </Accordion.Body>
        </Accordion.Item>
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
              <Accordion flush>
                {this.state.devices.map((d,i) => this.renderItem(d,i))}
              </Accordion>
            </Col>
          </Row>
        </>
    );
  }
}

export default DeviceList;
