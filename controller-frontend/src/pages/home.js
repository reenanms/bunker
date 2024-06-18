import React from 'react';
import AuthRedirector from '../components/authRedirector'

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
                
                <h2>Home</h2>
                
                Seja bem vindo
            </>
        )
    }
}

export default Home;