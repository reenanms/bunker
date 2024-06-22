import React from 'react';
import { Navigate } from 'react-router-dom';

import AuthRedirector from '../components/authRedirector'
import DashboardBuilder from '../components/dashboardBuilder'


class DashboardConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectTo: null
        }
    }

    redirectToDashboard = _ => {
        this.setState({redirectTo: "/dashboard" })
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

                <DashboardBuilder
                    onSave={this.redirectToDashboard}
                    onCancel={this.redirectToDashboard} />
            </>
        );
    }
}

export default DashboardConfig;