import React from "react";
import { Navigate } from "react-router-dom";
import authService from "../services/auth.service";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectTo: null
        }
    }

    async componentDidMount() {
        let loggedUser = await authService.getLoggedUser();

        if (!loggedUser) {
            this.setState({ redirectTo: "/" });
        }
    }

    render() {

        if (this.state.redirectTo) {
            return (
                <Navigate to={this.state.redirectTo} replace={true} />
            )
        }

        return (
            <div>
                <p>HOME PAGE</p>
            </div>
        )
    }
}

export default Home;