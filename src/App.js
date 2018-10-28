import React, { Component } from 'react';
import './App.css';
import MenuSuperior from './components/MenuSuperior/MenuSuperior';
import Investimento from './components/Investimento/Investimento';

class App extends Component {
  render() {
    return (
      <div>
        <MenuSuperior />
        <Investimento />
      </div>
    );
  }
}

export default App;
