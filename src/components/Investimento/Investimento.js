import React, { Component } from 'react';
import './Investimento.css'
import { calcularInvestimento } from "../../services/investimento"

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
        calcularInvestimento(this.props.tipoInvestimento, this.props.valor, this.props.indexador, this.props.taxa, this.props.dataInicial, this.props.dataFinal)
            .then(dados => {
                this.setState({
                    dataFinal: dados.body.resultadoInvestimento.dataInicial,
                    dataInicial: dados.body.resultadoInvestimento.dataInicial,
                    evolucao: dados.body.resultadoInvestimento.evolucao,
                    indexador: dados.body.resultadoInvestimento.indexador,
                    percIOF: dados.body.resultadoInvestimento.percIOF,
                    percImpostoRenda: dados.body.resultadoInvestimento.percImpostoRenda,
                    rentabilidadeBruta: dados.body.resultadoInvestimento.rentabilidadeBruta,
                    rentabilidadeLiquida: dados.body.resultadoInvestimento.rentabilidadeLiquida,
                    taxa: dados.body.resultadoInvestimento.taxa,
                    tipoInvestimento: dados.body.resultadoInvestimento.tipoInvestimento,
                    valIOF: dados.body.resultadoInvestimento.valIOF,
                    valImpostoRenda: dados.body.resultadoInvestimento.valImpostoRenda,
                    valInvestimentoInicial: dados.body.resultadoInvestimento.valInvestimentoInicial,
                    valSaldoBruto: dados.body.resultadoInvestimento.valSaldoBruto,
                    valSaldoLiquido: dados.body.resultadoInvestimento.valSaldoLiquido,
                });
        });
    }

    render(){
        return(
            <div className="card">
                <div className="card-header">
                    { this.state.tipoInvestimento } { this.state.indexador } + { this.state.taxa } %
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item text-right">{ this.state.valInvestimentoInicial.toLocaleString("pt-BR", { style: "currency", currency: "BRL"}) }</li>
                    <li className="list-group-item text-right">{ this.state.valImpostoRenda.toLocaleString("pt-BR", { style: "currency", currency: "BRL"}) }</li>
                    <li className="list-group-item text-right">{ this.state.valSaldoBruto.toLocaleString("pt-BR", { style: "currency", currency: "BRL"}) }</li>
                    <li className="list-group-item text-right">{ this.state.valIOF.toLocaleString("pt-BR", { style: "currency", currency: "BRL"}) }</li>
                    <li className="list-group-item text-right">{ this.state.valSaldoLiquido.toLocaleString("pt-BR", { style: "currency", currency: "BRL"}) }</li>
                </ul>
            </div>
        )

    }
}

export default Investimento;