import React from "react";
import { Navigate } from "react-router-dom";
import authService from '../services/auth.service';
import userService from '../services/user.service';

class AuthRedirector extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            user: null,
            isLoaded: false
        }
    }

    async loadUserInfos() {
        try {
            const token = await authService.getToken();
            if (!token)
                return;

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
      await this.loadUserInfos();
      this.setState({ isLoaded: true });
    }

    doRedirect() {
      if (this.props.whenLogged)
        return !!this.state.user;

      return !this.state.user;
    }

    render() {
      if (!this.state.isLoaded) {
        return (
          <></>
        );
      }

      if (!this.doRedirect()) {
        return (
          <></>
        );
      }
      
      return (
        <Navigate to={this.props.redirectTo} replace={true} />
      )
    }
}

export default AuthRedirector;