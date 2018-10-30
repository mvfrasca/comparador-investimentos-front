import React, { Component } from 'react';
import { consultarStatusAPI } from '../../services/statusApi';

class StatusAPI extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount(){
        consultarStatusAPI().then(dados => {
            this.setState({
                mensagem: dados.body.mensagem,
                
            });
        });
    }

    render(){
        return(
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-header">
                    Status atual da API 
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Mensagem: { this.state.mensagem }</li>
                </ul>
            </div>
        )

    }
}

export default StatusAPI;