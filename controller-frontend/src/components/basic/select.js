import React from 'react';
import Form from 'react-bootstrap/Form';

class DeviceModelForm extends React.Component {
    render() {
        return (
            <>
              <Form.Select name="schemaName" placeholder="Tipo de dado" defaultValue={this.props.device.schemaName} disabled>
                  <option>Seleciona o tipo de dado</option>
                  {this.props.schemas.map(schema =>
                      <option key={schema.name} value={schema.name}>{schema.name}</option>
                  )}
              </Form.Select>
            </>
        )
    }
}

export default DeviceModelForm;