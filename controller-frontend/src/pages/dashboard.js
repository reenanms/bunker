import React from 'react';
import AuthRedirector from '../components/authRedirector'

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <>
                <AuthRedirector redirectTo="/" />
                
                <iframe
                    title="Dashboard"
                    src="http://localhost:8081/?username=username&embed=true"
                    frameborder="0"
                    width="100%"
                    height="800"
                    allowFullScreen>
                </iframe>
            </>
        )
    }
}

export default Dashboard;