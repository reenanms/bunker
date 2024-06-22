import React from 'react';
import AuthRedirector from '../components/authRedirector'
import SchemaModelList from '../components/schemaModelList';

import authService from '../services/auth.service'
import schemaService from '../services/schema.service'

class Schema extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            schemas: [],
            schemasLoaded: false,
            schemasAll: [],
        }
    }

    async loadSchemas(token) {
        try {
            
            const schemasAll = await schemaService.getAllSchemas(token);
            
            const schemas = []
            for(const s of schemasAll){
                if (s.type !== 'OBJECT')
                    continue;
                
                let schemaField = await schemaService.getSchema(token, s.name);
                schemas.push(schemaField);
            }

            this.setState({
                schemasAll,
                schemas
            });
        }
        catch (e) {
            console.error(e);
        }

        this.setState({ schemasLoaded: true });
    }

    async componentDidMount() {
        const token = await authService.getToken();
        await this.loadSchemas(token);
    }

    isLoaded() {
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

                <h2>Modelos de dados</h2>

                <SchemaModelList
                    schemas={this.state.schemasAll}
                    schemaModels={this.state.schemas} />
            </>
        )
    }
}

export default Schema;
