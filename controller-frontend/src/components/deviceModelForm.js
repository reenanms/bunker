import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import authService from '../services/auth.service'
import deviceModelService from '../services/deviceModel.service'

const Mode = {
  View: "V",
  Edit: "E"
}

class DeviceModelForm extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        mode: this.props.newData ? Mode.Edit : Mode.View,
        newData: this.props.newData,
        id: this.props.value.id,
        schemaName: this.props.value.schemaName,
        description: this.props.value.description
      }
    }

    editClick = _ => {
      this.setState({ mode: Mode.Edit });
    }

    cancelClick = _ => {
      this.setState({
        mode: Mode.View,
        newData: false,
        id: this.props.value.id,
        schemaName: this.props.value.schemaName,
        description: this.props.value.description
      });
      console.log("cancelClick.state:", this.state);
    }

    saveClick = _ => {
      const newData = {
        id: this.state.id,
        description: this.state.description,
        schemaName: this.state.schemaName,
      };

      const token = authService.getToken();

      if (this.state.newData)
        deviceModelService.createDeviceModel(token, ...Object.values(newData));
      else
        deviceModelService.updateDeviceModel(token, ...Object.values(newData));

      this.setState({mode: Mode.View});
      this.props.onChange({ target: { value: newData, newData: false }});
    }

    renderButtons() {
      return (
        <>
          <Button variant="secondary" style={{float: 'right'}} hidden={this.state.mode !== Mode.View} onClick={this.editClick}  >Editar</Button>
          <Button variant="secondary" style={{float: 'right'}} hidden={this.state.mode === Mode.View} onClick={this.cancelClick}  >Cancelar</Button>
          <Button variant="primary"   style={{float: 'right'}} hidden={this.state.mode === Mode.View} onClick={this.saveClick}>Savar</Button>
        </>
      );
    }

    renderForm() {
      return (
          <>
            <Form>
              <Form.Control name="id" placeholder="Identificador"
                            value={this.state.id} onChange={e => this.setState({ id: e.target.value })}
                            disabled={!this.state.newData}/>
              <Form.Select name="schemaName" placeholder="Tipo de dado"
                          value={this.state.schemaName} onChange={e => this.setState({ schemaName: e.target.value })}
                          disabled={this.state.mode === Mode.View}>
                  <option>Seleciona o esquema de dados</option>
                  {this.props.schemas.map(schema =>
                      <option key={schema.name} value={schema.name}>{schema.name}</option>
                  )}
              </Form.Select>
              <Form.Control name="description" placeholder="Descrição" as="textarea" rows={3}
                            value={this.state.description} onChange={e => this.setState({ description: e.target.value })}
                            disabled={this.state.mode === Mode.View}/>
            </Form>
          </>
      );
    }

    render() {
        return (
            <>
              {this.renderForm()}
              {this.renderButtons()}
            </>
        );
    }
}

export default DeviceModelForm;