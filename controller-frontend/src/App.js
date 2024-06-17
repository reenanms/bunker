import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/header';
import HeaderItem from './components/headerItem';
import Login from './pages/login';
import Home from './pages/home';
import Schema from './pages/schema'


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
          <HeaderItem href="/schema" name="Schema" />
          <HeaderItem href="/schema" name="Schema 3" />
        </Header>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/schema" element={<Schema />} />
        </Routes>
      </Router>
    )
  }
}

export default App;
