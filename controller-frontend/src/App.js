import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import authService from './services/auth.service';
import Login from './pages/login';
import Home from './pages/home';
import Header from './components/header';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  logout() {
    authService.cleanLoggedUser();
    window.location.reload();
  }

  render() {
    return (
      <Router>
        <Header title="Bunker">
          <button onClick={e => this.logout()}>
            Sair
          </button>
        </Header>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    )
  }

}

export default App;
