import React from 'react';
import { Navigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button'

import AuthRedirector from '../components/authRedirector'

import authService from '../services/auth.service'
import userService from '../services/user.service'
import dashboardService from '../services/dashboard.service'


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            redirectTo: null,
            isNew: null,
            screenLoaded: false,
        }
    }

    async loadUser(token) {
        try {
            const user = await userService.getUser(token);
                
            this.setState({ user });
        }
        catch (e) {
            console.error(e)
        }
    }

    async loadIsNew(token) {
        try {
            await dashboardService.getDashboardConfig(token);
            this.setState({ isNew: false });
        }
        catch (e) {
            this.setState({ isNew: true });
        }
    }

    async componentDidMount() {
        const token = await authService.getToken();

        await this.loadUser(token);
        await this.loadIsNew(token);

        this.setState({ screenLoaded: true });
    }

    redirectToDashboardConfig = _ => {
        this.setState({ redirectTo: "/dashboard/config" })
    }

    renderLoading() {
        if (this.state.screenLoaded) {
            return (<></>);
        }

        return (
            <>Carregando dados...</>
        );
    }

    renderNewDashboard() {
        if (!this.state.screenLoaded) {
            return (<></>);
        }

        if (!this.state.isNew) {
            return (<></>);
        }

        return (
            <>
                <p>Dashboar ainda não foi configurado para o seu usuário</p>
                <Button
                    variant="secondary"
                    onClick={this.redirectToDashboardConfig}>
                    Configurar
                </Button>
            </>
        );
    }

    renderConfiguredDashboard() {
        if (!this.state.screenLoaded) {
            return (<></>);
        }

        if (this.state.isNew) {
            return (<></>);
        }

        const dashboardBaseUrl = process.env.REACT_APP_DASHBOARD_URL;
        const dashboardFullUrl = `${dashboardBaseUrl}/?username=${this.state.user.username}&embed=true&embed_options=light_theme`;

        return (
            <>
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

    render() {
        if (this.state.redirectTo) {
            return (
                <Navigate to={this.state.redirectTo} replace={true} />
            )
        }

        return (
            <>
                <AuthRedirector redirectTo="/" />

                <h2>Dashboard</h2>

                {this.renderLoading()}
                {this.renderNewDashboard()}
                {this.renderConfiguredDashboard()}
            </>
        );
    }
}

export default Dashboard;