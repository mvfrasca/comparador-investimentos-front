import React, { Component } from 'react';
import './Investimento.css'

class Investimento extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataFinal: "",              // 01/09/2018
            dataInicial: "",            // 01/09/2014
            evolucao: [
                // {
                //     data: "",           // 2014-09-01
                //     indice: 0,          // 1.0227221543640934
                //     valor: 0,           // 25255.68
                // }
            ],
            indexador: "",              // IPCA
            percIOF: 0,                 // 0
            percImpostoRenda: 0,        // 15
            rentabilidadeBruta: 0,      // 14891.36
            rentabilidadeLiquida: 0,    // 12657.656
            taxa: 0,                    // 5.57
            tipoInvestimento: "",       // CDB
            valIOF: 0,                  // 0
            valImpostoRenda: 0,         // 2233.704
            valInvestimentoInicial: 0,  // 25000
            valSaldoBruto: 0,           // 39891.36
            valSaldoLiquido: 0          // 37657.656
        }
    }

    componentDidMount(){
        fetch("https://comparador-investimentos.appspot.com/api/investimento?tipoInvestimento=cdb&valor=25000&indexador=ipca&taxa=5.57&dataInicial=01/09/2014&dataFinal=01/09/2018")
        .then(result => result.json().then(dados => {
            this.setState({
                dataFinal: dados.resultadoInvestimento.dataInicial,
                dataInicial: dados.resultadoInvestimento.dataInicial,
                evolucao: dados.resultadoInvestimento.evolucao,
                indexador: dados.resultadoInvestimento.indexador,
                percIOF: dados.resultadoInvestimento.percIOF,
                percImpostoRenda: dados.resultadoInvestimento.percImpostoRenda,
                rentabilidadeBruta: dados.resultadoInvestimento.rentabilidadeBruta,
                rentabilidadeLiquida: dados.resultadoInvestimento.rentabilidadeLiquida,
                taxa: dados.resultadoInvestimento.taxa,
                tipoInvestimento: dados.resultadoInvestimento.tipoInvestimento,
                valIOF: dados.resultadoInvestimento.valIOF,
                valImpostoRenda: dados.resultadoInvestimento.valImpostoRenda,
                valInvestimentoInicial: dados.resultadoInvestimento.valInvestimentoInicial,
                valSaldoBruto: dados.resultadoInvestimento.valSaldoBruto,
                valSaldoLiquido: dados.resultadoInvestimento.valSaldoLiquido,
            });
        }));
    }

    render(){
        return(
            <div className="card" style={{ width: "18rem;" }}>
                <div className="card-header">
                    { this.state.tipoInvestimento } { this.state.indexador } + { this.state.taxa } %
                </div>
                <ul class="list-group list-group-flush">
                    <li className="list-group-item">Valor do Investimento inicial: { this.state.valInvestimentoInicial.toLocaleString("pt-BR", { style: "currency", currency: "BRL"}) }</li>
                    <li className="list-group-item">Valor do Imposto de Renda: { this.state.valImpostoRenda.toLocaleString("pt-BR", { style: "currency", currency: "BRL"}) }</li>
                    <li className="list-group-item">Valor do Saldo Bruto: { this.state.valSaldoBruto.toLocaleString("pt-BR", { style: "currency", currency: "BRL"}) }</li>
                    <li className="list-group-item">Valor do IOF: { this.state.valIOF.toLocaleString("pt-BR", { style: "currency", currency: "BRL"}) }</li>
                    <li className="list-group-item">Valor do Saldo Líquido: { this.state.valSaldoLiquido.toLocaleString("pt-BR", { style: "currency", currency: "BRL"}) }</li>
                </ul>
            </div>
        )

    }
}

export default Investimento;