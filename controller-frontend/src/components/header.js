import React from 'react';
import { Link } from 'react-router-dom'
import authService from '../services/auth.service';

class Header extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loggedUser: false
        }
    }

    async componentDidMount() {
        let loggedUser = await authService.getLoggedUser();
        if (loggedUser) {
            this.setState({ loggedUser: true });
        }
    }

    render() {
        if (!this.state.loggedUser) {
            return (
                <></>
            )
        }

        return (
            <nav>
                <a href="#" onClick={this.props.onTitleClicked}>
                    {this.props.title}
                </a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/home" className="nav-link">
                                Home
                            </Link>
                        </li>
                    </ul>
                </div>
                {this.props.children}
            </nav>
        )
    }
}

export default Header;