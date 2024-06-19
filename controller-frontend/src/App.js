import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import Header from './components/header';
import HeaderItem from './components/headerItem';

import Login from './pages/login';
import Register from './pages/register'
import Home from './pages/home';
import DeviceModel from './pages/deviceModel'
import Schema from './pages/schema'
import Dashboard from './pages/dashboard'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Router>
        <Header title="Bunker" href="/home">
          <HeaderItem href="/home" name="Home" />
          <HeaderItem href="/dashboard" name="Dashboard" />
          <HeaderItem href="/deviceModel" name="Modelos de dispositivo" />
          <HeaderItem href="/schema" name="Esquemas de dados" />
        </Header>
        <Container>
          <Routes>
            <Route path="/"            element={<Login />} />
            <Route path="/register"    element={<Register />} />
            <Route path="/home"        element={<Home />} />
            <Route path="/dashboard"   element={<Dashboard />} />
            <Route path="/deviceModel" element={<DeviceModel />} />
            <Route path="/schema"      element={<Schema />} />
          </Routes>
        </Container>
      </Router>
    )
  }
}

export default App;
