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
        name: this.props.value.name,
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
        name: this.props.value.name,
        schemaName: this.props.value.schemaName,
        description: this.props.value.description
      });

      this.props.onCancel();
    }

    saveClick = async _ => {
      

      const token = authService.getToken();

      let newData;
      if (this.state.newData){
        const dataToSend = {
          name: this.state.name,
          description: this.state.description,
          schemaName: this.state.schemaName,
        };

        newData = await deviceModelService.createDeviceModel(token, ...Object.values(dataToSend));
      }
      else {
        const dataToSend = {
          id: this.state.id,
          name: this.state.name,
          description: this.state.description,
          schemaName: this.state.schemaName,
        };
        
        newData = await deviceModelService.updateDeviceModel(token, ...Object.values(dataToSend));
      }

      this.setState({mode: Mode.View});
      this.props.onChange({ target: { value: newData, newData: false }});
    }

    excluirClick = async _ => {
      const token = authService.getToken();
      await deviceModelService.deleteDeviceModel(token, this.state.id);
      this.props.onDelete();
    }

    renderButtons() {
      return (
        <>
          <Button variant="danger"    style={{float: 'right'}} hidden={this.state.mode !== Mode.View} onClick={this.excluirClick}>Excluir</Button>
          <Button variant="secondary" style={{float: 'right'}} hidden={this.state.mode !== Mode.View} onClick={this.editClick}>Editar</Button>
          <Button variant="primary"   style={{float: 'right'}} hidden={this.state.mode === Mode.View} onClick={this.saveClick}>Salvar</Button>
          <Button variant="secondary" style={{float: 'right'}} hidden={this.state.mode === Mode.View} onClick={this.cancelClick}>Cancelar</Button>
        </>
      );
    }

    renderForm() {
      return (
          <>
            <Form>
              <Form.Label>Identificador</Form.Label>
              <Form.Control name="id" placeholder="Identificador"
                            value={this.state.id} onChange={e => this.setState({ id: e.target.value })}
                            disabled/>
              <Form.Label>Nome</Form.Label>
              <Form.Control name="name" placeholder="Nome"
                            value={this.state.name} onChange={e => this.setState({ name: e.target.value })}
                            disabled={this.state.mode === Mode.View}/>
              <Form.Label>Modelo de dado</Form.Label>
              <Form.Select name="schemaName" placeholder="Modelo de dado"
                          value={this.state.schemaName} onChange={e => this.setState({ schemaName: e.target.value })}
                          disabled={this.state.mode === Mode.View}>
                  <option>Selecione um item</option>
                  {this.props.schemas.map(schema =>
                      <option key={schema.name} value={schema.name}>{schema.name}</option>
                  )}
              </Form.Select>
              <Form.Label>Descrição</Form.Label>
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