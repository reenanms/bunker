import React from 'react';
import AuthRedirector from '../components/authRedirector'

import authService from '../services/auth.service'
import schemaService from '../services/schema.service'

class Schema extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            schemas: [],
            schemasLoaded: false,
        }
    }

    async loadSchemas(token) {
        try {
            const schemas = await schemaService.getAllSchemas(token);
            this.setState({ schemas });
        }
        catch (e) {
            console.error(e)
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

                <h2>Esquemas de dados</h2>

                {this.state.schemas.map((schema, index) => <div>{schema.name}</div>)}
            </>
        )
    }
}

export default Schema;
