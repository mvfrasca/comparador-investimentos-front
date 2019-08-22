import React, { Component } from 'react';
import './App.css';
import MenuSuperior from './components/MenuSuperior/MenuSuperior';
import StatusAPI from './components/StatusAPI/StatusAPI';
import Indices from './components/Indices/Indices';
import Comparacao from './containers/Comparacao';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <MenuSuperior />
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <Switch>
                <Route path="/" exact component={StatusAPI} />                           
                <Route path="/rendafixa" component={Comparacao} />
                <Route path="/indices" component={Indices} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
