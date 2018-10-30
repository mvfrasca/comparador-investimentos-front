import React, { Component } from 'react';
import Investimento from '../Investimento/Investimento';

class Comparacao extends Component {
    constructor(props){
        super(props);
        this.state = {
            investimentos : [
                {
                    tipoInvestimento: "poupanca",
                    valor: 25000,
                    indexador: "poupanca",
                    taxa: 0,
                    dataInicial: "01/09/2014",
                    dataFinal: "01/09/2018"
                },
                {
                    tipoInvestimento: "cdb",
                    valor: 25000,
                    indexador: "ipca",
                    taxa: 5.57,
                    dataInicial: "01/09/2014",
                    dataFinal: "01/09/2018"
                }
            ]
        }
    }

    componentDidMount(){
       
    }

    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-header">
                                Investimentos
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Valor do Investimento inicial</li>
                                <li className="list-group-item">Valor do Imposto de Renda</li>
                                <li className="list-group-item">Valor do Saldo Bruto</li>
                                <li className="list-group-item">Valor do IOF</li>
                                <li className="list-group-item">Valor do Saldo Líquido</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col">
                        < Investimento 
                            tipoInvestimento = {this.state.investimentos[0].tipoInvestimento}
                            valor = {this.state.investimentos[0].valor}
                            indexador = {this.state.investimentos[0].indexador}
                            taxa = {this.state.investimentos[0].taxa}
                            dataInicial = {this.state.investimentos[0].dataInicial}
                            dataFinal = {this.state.investimentos[0].dataFinal}
                         />
                    </div>
                    <div className="col">
                    < Investimento 
                            tipoInvestimento = {this.state.investimentos[1].tipoInvestimento}
                            valor = {this.state.investimentos[1].valor}
                            indexador = {this.state.investimentos[1].indexador}
                            taxa = {this.state.investimentos[1].taxa}
                            dataInicial = {this.state.investimentos[1].dataInicial}
                            dataFinal = {this.state.investimentos[1].dataFinal}
                         />
                    </div>
                </div>
            </div>
        )

    }
}

export default Comparacao;