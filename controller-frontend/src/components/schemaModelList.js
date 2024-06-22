import React from "react";

import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SchemaModelForm from './schemaModelForm';

class SchemaModelList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schemaModels: this.props.schemaModels ?? [],
            schemas: this.props.schemas ?? [],
            newData: false
        }
    }

    addSchemaModel = _ => {
        this.setState({ newData: true });
    }

    newSchemaModelChanged(newSchemaModel) {
        let allSchemaModels = this.state.schemaModels;
        allSchemaModels.push(newSchemaModel);
        this.setState({
            schemaModels: allSchemaModels,
            newData: false
        });
    }

    schemaModelChanged(newSchemaModel, index) {
        let allSchemaModels = this.state.schemaModels;
        allSchemaModels[index] = newSchemaModel;
        this.setState({ schemaModels: allSchemaModels });
    }

    schemaModelDeleted(index) {
        let allSchemaModels = this.state.schemaModels;
        allSchemaModels.splice(index, 1);
        this.setState({ schemaModels: allSchemaModels });
    }

    renderNewSchemaModelAccordion() {
        if (!this.state.newData)
            return (
                <></>
            );

        const newSchemaModel = {
            name: "",
            definitions: []
        };

        return (
            <>
                {this.renderSchemaModelAccordion(newSchemaModel,
                    -1,
                    e => this.newSchemaModelChanged(e.target.value),
                    () => this.setState({ newData: false }),
                    () => { })}
            </>
        );
    }

    renderSchemaModelAccordion(schemaModel, index, onChange, onCancel, onDelete) {
        return (
            <>
                <Accordion.Item key={`${index}`} eventKey={`${index}`}>
                    <Accordion.Header>
                        {index === -1 ? "<Adicionando novo>" : `${schemaModel.name}`}
                    </Accordion.Header>
                    <Accordion.Body>
                        <Row>
                            <Col>
                                <SchemaModelForm
                                    value={schemaModel}
                                    onChange={onChange}
                                    onCancel={onCancel}
                                    onDelete={onDelete}
                                    newData={index === -1}
                                    schemas={this.state.schemas}/>
                            </Col>
                        </Row>
                    </Accordion.Body>
                </Accordion.Item>
            </>
        );
    }

    render() {
        return (
            <>
                <Row>
                    <Col>
                        <Button variant="primary"
                            style={{ float: 'right' }}
                            disabled={this.props.disabled}
                            onClick={this.addSchemaModel}>Adicionar modelo de dado</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Accordion alwaysOpen defaultActiveKey={['-1']}>
                            {this.state.schemaModels.map((schemaModel, index) =>
                                this.renderSchemaModelAccordion(schemaModel,
                                    index,
                                    e => this.schemaModelChanged(e.target.value),
                                    () => { },
                                    _ => this.schemaModelDeleted(index)))}
                            
                            {this.renderNewSchemaModelAccordion()}
                        </Accordion>
                    </Col>
                </Row>
            </>
        );
    }
}

export default SchemaModelList;