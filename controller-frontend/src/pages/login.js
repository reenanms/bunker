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
            username: "",
            password: "",
            redirectTo: null
        }
    }

    sendLogin = async (event) => {
        event.preventDefault();

        try {
            const auth = await authService.authenticate(this.state.username, this.state.password);
            authService.setAuthData(auth);

            const token = authService.getToken();
            await userService.getUser(token);

            this.setState({ redirectTo: "/home" });
            window.location.reload();
        } catch (error) {
            console.error(error);
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
                <AuthRedirector whenLogged redirectTo="/home" />

                <h2>Login</h2>

                <Form onSubmit={this.sendLogin}>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Usuário</Form.Label>
                        <Form.Control type="text"
                                      placeholder="Usuário"
                                      value={this.state.username}
                                      onChange={e => this.setState({ username: e.target.value })} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password"
                                      placeholder="Senha"
                                      value={this.state.password}
                                      onChange={e => this.setState({ password: e.target.value })} />
                    </Form.Group>
                    
                    <div style={{float: 'right'}}>Não possui cadastro? <a href='/register'>Registrar novo usuário</a></div>
                    
                    <Button variant="primary" type="submit">Entrar</Button>
                </Form>
            </>
        )
    }
}

export default Login;
