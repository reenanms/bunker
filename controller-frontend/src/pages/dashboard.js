import React from 'react';
import AuthRedirector from '../components/authRedirector'

import authService from '../services/auth.service'
import userService from '../services/user.service'


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }

    async loadUser() {
        try {
            const token = await authService.getToken();
            const user = await userService.getUser(token);
            if (!user)
                return;
                
            this.setState({ user });
        }
        catch (e) {
            console.error(e)
        }
    }

    async componentDidMount() {
        await this.loadUser();
      }

    render() {
        if (this.state.user) {
            return ( <></> )
        }

        const dashboardBaseUrl = process.env.REACT_APP_DASHBOARD_URL;;
        const dashboardFullUrl = `${dashboardBaseUrl}/?username=${this.state.user.username}&embed=true`;

        return (
            <>
                <AuthRedirector redirectTo="/" />
                
                <iframe
                    title="Dashboard"
                    src={dashboardFullUrl}
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