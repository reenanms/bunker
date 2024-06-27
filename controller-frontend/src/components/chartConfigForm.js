import React from 'react';
import Form from 'react-bootstrap/Form';

const FILTER_FEELD = "deviceId";
const FILTER_OPERATOR = "$eq"

class ChartConfigForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        value: props.value
    }
  }

  newState = setNewValue => {
    this.setState(previewState => {
      let newState = { ...previewState };
      setNewValue(newState);
      return newState;
    });

    this.props.onChange({
      target: {
        value: this.state.value
      }
    });
  }

  getFields() {
    const deviceId = this.state.value.filter[FILTER_FEELD][FILTER_OPERATOR];
    if (!deviceId)
      return [];

    const schemaName = this.props.mapDeviceSchemas[deviceId];
    if (!schemaName)
      return [];

    const fields = this.props.schemasFields[schemaName];
    if (!fields)
      return [];
    
    return fields;
  }

  renderDefinition(definition) {
    const fields = this.getFields();

    return (
      <>
          <Form.Label>{`Descrição ${definition}`}</Form.Label>
          <Form.Control name={`${definition}_description`}
                      placeholder={`Descrição ${definition}`}
                      value={this.state.value.chartDefinition[definition].description}
                      onChange={e => this.newState(v => v.value.chartDefinition[definition].description = e.target.value)}
                      type="text"/>
          
          <Form.Label>{`Caminho ${definition}`}</Form.Label>
          <Form.Select name={`${definition}_jPath`}
                      placeholder={`Caminho ${definition}`}
                      value={this.state.value.chartDefinition[definition].jPath}
                      onChange={e => this.newState(v => v.value.chartDefinition[definition].jPath = e.target.value)} >
              <option>Selecione um item</option>
              {fields.map(path =>
                  <option key={path} value={path}>{path}</option>
              )}
          </Form.Select>
      </>
    )
  }

  render() {
    const sizes = [
      { value:1, name:"P" },
      { value:2, name:"M" },
      { value:3, name:"G" },
    ];

    return (
      <>
          <Form>
              <Form.Label>Tamanho</Form.Label>
              <Form.Select name="size"
                      placeholder="Tamanho"
                      value={this.state.value.size}
                      onChange={e => this.newState(s => s.value.size = Number(e.target.value))} >
                  <option>Selecione um item</option>
                  {sizes.map(e =>
                      <option key={e.value} value={e.value}>{e.name}</option>
                  )}
              </Form.Select>

              
              <Form.Label>Dipositivo</Form.Label>
              <Form.Select name="device"
                      placeholder="Dipositivo"
                      value={this.state.value.filter[FILTER_FEELD][FILTER_OPERATOR]}
                      onChange={e => this.newState(s => s.value.filter[FILTER_FEELD][FILTER_OPERATOR] = e.target.value)} >
                  <option>Selecione um item</option>
                  {this.props.devices.map(e =>
                      <option key={e.value} value={e.value}>{e.name}</option>
                  )}
              </Form.Select>

              <Form.Label>Tipo de gráfico</Form.Label>
              <Form.Select name="chartType"
                      placeholder="Tipo de gráfico"
                      value={this.state.value.chartType}
                      onChange={e => this.newState(s => s.value.chartType = e.target.value)} >
                  <option>Selecione um item</option>
                  {this.props.chartTypes.map(e =>
                      <option key={e.value} value={e.value}>{e.name}</option>
                  )}
              </Form.Select>

              {this.renderDefinition("x")}
              {this.renderDefinition("y")}
          </Form>
      </>
    );
  }
}

export default ChartConfigForm;
