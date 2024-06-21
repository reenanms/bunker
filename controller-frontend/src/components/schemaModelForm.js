import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import authService from '../services/auth.service'
import schemaService from '../services/schema.service'

const Mode = {
    View: "V",
    Edit: "E"
}

class SchemaModelForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: this.props.newData ? Mode.Edit : Mode.View,
            newData: this.props.newData,
            name: this.props.value.name,
            definitions: this.props.value.definition ?? []
        }
    }

    editClick = _ => {
        this.setState({ mode: Mode.Edit });
    }

    cancelClick = _ => {
        this.setState({
            mode: Mode.View,
            newData: false,
            name: this.props.value.name,
            definitions: this.props.value.definition ?? []
        });

        this.props.onCancel();
    }

    excluirClick = async _ => {
        const token = authService.getToken();
        await schemaService.deleteSchema(token, this.state.name);
        this.props.onDelete();
    }

    saveClick = async _ => {
        const token = authService.getToken();
        let newData;
        const properties = [];

        this.state.definitions.forEach(df => {
            properties.push(df);
        });

        if (this.state.newData) {
            newData = await schemaService.createSchemaObject(token, this.state.name, properties);
        }
        else {
            newData = await schemaService.updateSchemaObject(token, this.state.name, properties);
        }

        this.setState({ mode: Mode.View });
        this.props.onChange({ target: { value: newData, newData: false } });
    }

    handleAddDefinition = () => {
        this.setState(prevState => ({
            definitions: [...prevState.definitions, { name: '', schema: '' }]
        }));
    };

    handleRemoveDefinition = index => {
        this.setState(prevState => ({
            definitions: prevState.definitions.filter((_, i) => i !== index)
        }));
    };

    handleChange = (index, key, value) => {
        const newDefinitions = [...this.state.definitions];
        newDefinitions[index][key] = value;
        this.setState({ definitions: newDefinitions });
    };

    renderButtons() {
        return (
            <>
                <Button variant="danger" style={{ float: 'right' }} hidden={this.state.mode !== Mode.View} onClick={this.excluirClick}>Excluir</Button>
                <Button variant="secondary" style={{ float: 'right' }} hidden={this.state.mode !== Mode.View} onClick={this.editClick}>Editar</Button>
                <Button variant="primary" style={{ float: 'right' }} hidden={this.state.mode === Mode.View} onClick={this.saveClick}>Salvar</Button>
                <Button variant="secondary" style={{ float: 'right' }} hidden={this.state.mode === Mode.View} onClick={this.cancelClick}>Cancelar</Button>
            </>
        );
    }

    renderForm() {
        return (
            <>
                <Form>
                    <Form.Control
                        name="name" placeholder="Nome"
                        value={this.state.name} onChange={e => this.setState({ name: e.target.value })}
                        disabled={this.state.mode === Mode.View} />
                    <label>Definições</label>
                    {this.state.definitions.map((definition, index) => (
                        <div key={index}>
                            <Form.Control
                                name="name"
                                placeholder="Nome"
                                value={definition.name}
                                onChange={e => this.handleChange(index, 'name', e.target.value)}
                                disabled={this.state.mode === Mode.View} />
                            <Form.Select
                                name="schema"
                                placeholder="Tipo de dado"
                                value={definition.schema}
                                onChange={e => this.handleChange(index, 'schema', e.target.value)}
                                disabled={this.state.mode === Mode.View}>
                                <option>Seleciona o esquema de dados</option>
                                {this.props.schemas.map(schema =>
                                    <option key={schema.name} value={schema.name}>{schema.name}</option>
                                )}
                            </Form.Select>
                            {this.state.mode !== 'View' && (
                                <Button variant="danger" onClick={() => this.handleRemoveDefinition(index)}>
                                    Remover
                                </Button>
                            )}
                        </div>
                    ))}

                    {this.state.mode !== 'View' && (
                        <Button variant="primary" onClick={this.handleAddDefinition}>
                            Adicionar Definição
                        </Button>
                    )}

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

export default SchemaModelForm;