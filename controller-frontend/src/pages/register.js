import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import AuthRedirector from '../components/authRedirector'

import userService from '../services/user.service';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            username: "",
            password: "",
            success: false,

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

    createUser = async event => {
        if (!this.isValid(event))
            return;

        try {
            await userService.createUser(this.state.name, this.state.username, this.state.password);

            this.setState({ success: true })
        } catch (error) {
            this.setState({ errorMessage: "Erro ao criar usuário." });
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
                <Form noValidate validated={this.state.formValidated}  onSubmit={this.createUser}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control required
                                      type="text"
                                      placeholder="Nome"
                                      value={this.state.name}
                                      onChange={e => this.setState({ name: e.target.value })} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Usuário</Form.Label>
                        <Form.Control required
                                      type="text"
                                      placeholder="Usuário"
                                      value={this.state.username}
                                      onChange={e => this.setState({ username: e.target.value })} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control required
                                      type="password"
                                      placeholder="Senha"
                                      value={this.state.password}
                                      onChange={e => this.setState({ password: e.target.value })} />
                    </Form.Group>

                    {this.renderErrorMessage()}

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
