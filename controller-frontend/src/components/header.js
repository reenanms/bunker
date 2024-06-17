import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import authService from '../services/auth.service';
import userService from '../services/user.service';


class Header extends React.Component {

    constructor(props) {
        super(props)
        
        this.state = {
            user: null
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
                
            this.setState({ user } );
        }
        catch (e) {
            console.error(e)
        }
    }

    async componentDidMount() {
      await this.loadUserInfos();
    }

    logout() {
        authService.cleanAuth();
        window.location.reload();
    }

    render() {
        if (!this.state.user) {
            return (
                <></>
            );
        }

        return (
            <>
                <Navbar expand="lg" className="bg-body-tertiary">
                  <Container>
                    <Navbar.Brand href={this.props.href}>{this.props.title}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="me-auto">
                        {this.props.children}
                      </Nav>

                      <Navbar.Text>
                        Logado como: 
                      </Navbar.Text>
                      <NavDropdown title={this.state.user.name} id="basic-nav-dropdown">
                        <NavDropdown.Item href="#" onClick={_ => this.logout()}>Sair</NavDropdown.Item>
                      </NavDropdown>
                    </Navbar.Collapse>
                  </Container>

                  
                </Navbar>
            </>
        )
    }
}

export default Header;