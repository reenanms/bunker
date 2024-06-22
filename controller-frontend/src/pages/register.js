import React, { Component } from 'react';
import AuthRedirector from '../components/authRedirector'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import userService from '../services/user.service';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            username: "",
            password: "",
            success: false,
        }
    }

    createUser = async event => {
        event.preventDefault();

        try {
            await userService.createUser(this.state.name, this.state.username, this.state.password);

            this.setState({ success: true })
        } catch (error) {
            console.error(error);
            alert("Erro ao criar usuário");
        }
    }

    renderBody() {
        if (this.state.success) {
          return (
            <>
                <div>Usuário criado com sucesso. <a href='/'>Ir para a tela de login</a></div>
            </>
          )
        }

        return (
            <>
                <Form onSubmit={this.createUser}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text"
                                      placeholder="Nome"
                                      value={this.state.name}
                                      onChange={e => this.setState({ name: e.target.value })} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="username">
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
                    <Button variant="primary" type="submit">Criar usuário</Button>
                </Form>
            </>
        )
    }

    render() {
        return (
            <>
                <AuthRedirector whenLogged redirectTo="/home" />

                <h2>Registro de usuário</h2>

                {this.renderBody()}
            </>
        )
    }
}

export default Login;
