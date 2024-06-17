import React, { Component } from 'react';
import authService from '../services/auth.service';
import userService from '../services/user.service';
import { Navigate } from "react-router-dom";
import AuthRedirector from '../components/authRedirector'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "admin",
            password: "admin",
            redirectTo: null
        }
    }

    sendLogin = async (event) => {
        event.preventDefault();

        try {
            const auth = await authService.authenticate(this.state.userName, this.state.password);
            authService.setAuthData(auth);

            const token = authService.getToken();
            const user = await userService.getUser(token);
            console.log(user);

            this.setState({ redirectTo: "/home" })
        } catch (error) {
            console.error(error);
            alert("Erro ao efetuar login.");
        }

        window.location.reload();
    }

    render() {

        if (this.state.redirectTo) {
            return (
                <Navigate to={this.state.redirectTo} replace={true} />
            )
        }

        return (
            <>
                <AuthRedirector whenLogged redirectTo="/home" />

                <Form onSubmit={this.sendLogin}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Usuário</Form.Label>
                        <Form.Control type="text"
                                      placeholder="Usuário"
                                      value={this.state.userName}
                                      onChange={e => this.setState({ userName: e.target.value })} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password"
                                      placeholder="Senha"
                                      value={this.state.password}
                                      onChange={e => this.setState({ password: e.target.value })} />
                    </Form.Group>
                    <Button variant="primary" type="submit">Entrar</Button>
                </Form>
            </>
        )
    }
}

export default Login;
