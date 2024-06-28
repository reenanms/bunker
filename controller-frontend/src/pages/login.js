import React, { Component } from 'react';
import { Navigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import AuthRedirector from '../components/authRedirector'

import authService from '../services/auth.service';
import userService from '../services/user.service';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            redirectTo: null,

            formValidated: false,
            errorMessage: null
        }
    }

    isValid = event => {
        event.preventDefault();

        const form = event.currentTarget;
        if (!form.checkValidity()) {
            event.stopPropagation();
            this.setState({ formValidated: true });
            return false;
        }

        this.setState({ formValidated: false });
        return true;
    }

    sendLogin = async event => {
        if (!this.isValid(event))
            return;

        try {
            const auth = await authService.authenticate(this.state.username, this.state.password);
            authService.setAuthData(auth);

            const token = authService.getToken();
            await userService.getUser(token);

            this.setState({ redirectTo: "/home" });
            window.location.reload();
        } catch (error) {
            this.setState({ errorMessage: "Erro ao efetuar login." });
            console.error(error);
        }
    }

    renderErrorMessage() {
        if (!this.state.errorMessage) {
            return (<></>);
        }

        return (
            <>
                <Form.Group controlId="alert">
                    <Alert variant="danger">{this.state.errorMessage}</Alert>
                </Form.Group>
            </>
        )
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

                <h2>Login</h2>

                <Form noValidate validated={this.state.formValidated} onSubmit={this.sendLogin}>
                    <Form.Group controlId="passwordv00">
                        <Form.Label>Usuário</Form.Label>
                        <Form.Control required
                                      type="text"
                                      placeholder="Usuário"
                                      value={this.state.username}
                                      onChange={e => this.setState({ username: e.target.value })} />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control required
                                      type="password"
                                      placeholder="Senha"
                                      value={this.state.password}
                                      onChange={e => this.setState({ password: e.target.value })} />
                    </Form.Group>

                    {this.renderErrorMessage()}
                    
                    <div style={{float: 'right'}}>Não possui cadastro? <a href='/register'>Registrar novo usuário</a></div>
                    
                    <Button variant="primary" type="submit">Entrar</Button>
                </Form>
            </>
        )
    }
}

export default Login;
