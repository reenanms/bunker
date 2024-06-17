import React from 'react';
import AuthRedirector from '../components/authRedirector'
import schemaService from '../services/schema.service'
import authService from '../services/auth.service'

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <>
                <AuthRedirector redirectTo="/" />
                
                <div>
                    <p>Home</p>
                    Seja bem vindo
                </div>
            </>
        )
    }
}

export default Home;