import React from 'react';
import { Navigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button'

import AuthRedirector from '../components/authRedirector'

import authService from '../services/auth.service'
import userService from '../services/user.service'


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            redirectTo: null
        }
    }

    async loadUser() {
        try {
            const token = await authService.getToken();
            const user = await userService.getUser(token);
                
            this.setState({ user });
        }
        catch (e) {
            console.error(e)
        }
    }

    async componentDidMount() {
        await this.loadUser();
    }

    redirectToDashboardConfig = _ => {
        this.setState({redirectTo: "/dashboard/config" })
    }

    render() {
        if (this.state.redirectTo) {
            return (
                <Navigate to={this.state.redirectTo} replace={true} />
            )
        }

        if (!this.state.user) {
            return ( <></> );
        }

        const dashboardBaseUrl = process.env.REACT_APP_DASHBOARD_URL;
        const dashboardFullUrl = `${dashboardBaseUrl}/?username=${this.state.user.username}&embed=true`;

        return (
            <>
                <AuthRedirector redirectTo="/" />

                <h2>Dashboard</h2>

                <iframe
                    title="Dashboard"
                    src={dashboardFullUrl}
                    frameborder="0"
                    style={{ width: "100%", height: 600 }}
                    allowFullScreen>
                </iframe>
            
                <Button
                    variant="secondary"
                    style={{float: 'right'}}
                    onClick={this.redirectToDashboardConfig}>
                    Editar
                </Button>
            </>
        );
    }
}

export default Dashboard;