import React, { Component } from 'react';
import authService from '../services/auth.service';
import { Navigate } from "react-router-dom";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: "",
            redirectTo: null
        }
    }

    sendLogin = async (event) => {
        event.preventDefault();
        let data = {
            username: this.state.userName,
            password: this.state.password
        }

        try {
            let res = await authService.authenticate(data);
            authService.setLoggedUser(res.data);
            this.setState({ redirectTo: "/home" })
        } catch (error) {
            console.log(error);
            alert("Erro ao efetuar login.");
        }
    }

    render() {

        if (this.state.redirectTo) {
            return (
                <Navigate to={this.state.redirectTo} replace={true} />
            )
        }

        return (
            <>
                <div className="container">
                    <div className="login-form">
                        <form onSubmit={this.sendLogin}>
                            <div>
                                <label>Usuário</label>
                                <input
                                    type="text"
                                    placeholder="Usuário"
                                    value={this.state.userName}
                                    onChange={e => this.setState({ userName: e.target.value })} />
                            </div>
                            <div>
                                <label htmlFor="password">Senha</label>
                                <input
                                    type="password"
                                    placeholder="Senha"
                                    value={this.state.password}
                                    onChange={e => this.setState({ password: e.target.value })} />
                            </div>
                            <button type="submit">Entrar</button>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

export default Login;