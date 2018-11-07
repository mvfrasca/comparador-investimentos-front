import React, { Component } from 'react';
import './Investimento.css'
//import { calcularInvestimento } from "../../services/investimento"
import * as investimentosActions from './../../store/investimentos/actions';
import InvestimentoForm from '../InvestimentoForm/InvestimentoForm';

class Investimento extends Component {
    constructor(investimento, onAtualizarInvestimentoRequest){
        console.log("Investimento.constructor")
        super(investimento);
        this.state = {
            // Controle do modal
            modalIsOpen: false,
            // Parâmetros de entrada
            id: investimento.id,
            tipoInvestimento: investimento.tipoInvestimento,
            valInvestimentoInicial: investimento.valInvestimentoInicial,
            indexador: investimento.indexador,
            taxa: investimento.taxa,
            dataInicial: investimento.dataInicial,
            dataFinal: investimento.dataFinal,
            investimento: {},
            // Resultado do investimento
            evolucao: [
                // {
                //     data: "",           // 2014-09-01
                //     indice: 0,          // 1.0227221543640934
                //     valor: 0,           // 25255.68
                // }
            ],
            percIOF: 0,                 // 0
            percImpostoRenda: 0,        // 15
            rentabilidadeBruta: 0,      // 14891.36
            rentabilidadeLiquida: 0,    // 12657.656
            valIOF: 0,                  // 0
            valImpostoRenda: 0,         // 2233.704
            valSaldoBruto: 0,           // 39891.36
            valSaldoLiquido: 0          // 37657.656
        }
        this.btnAlterarInvestimento_Click = this.btnAlterarInvestimento_Click.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.atualizarInvestimento = this.atualizarInvestimento.bind(this);
    }

    componentDidMount(){
        investimentosActions.calcularInvestimento(this.state.id)
    }

    // componentDidMount(){
    //     console.log("Investimento.componentDidMount")
    //     calcularInvestimento(this.state.tipoInvestimento, this.state.valInvestimentoInicial, this.state.indexador, this.state.taxa, this.state.dataInicial, this.state.dataFinal)
    //         .then(dados => {
    //             this.setState({
    //                 dataFinal: dados.body.resultadoInvestimento.dataInicial,
    //                 dataInicial: dados.body.resultadoInvestimento.dataInicial,
    //                 evolucao: dados.body.resultadoInvestimento.evolucao,
    //                 indexador: dados.body.resultadoInvestimento.indexador,
    //                 percIOF: dados.body.resultadoInvestimento.percIOF,
    //                 percImpostoRenda: dados.body.resultadoInvestimento.percImpostoRenda,
    //                 rentabilidadeBruta: dados.body.resultadoInvestimento.rentabilidadeBruta,
    //                 rentabilidadeLiquida: dados.body.resultadoInvestimento.rentabilidadeLiquida,
    //                 taxa: dados.body.resultadoInvestimento.taxa,
    //                 tipoInvestimento: dados.body.resultadoInvestimento.tipoInvestimento,
    //                 valIOF: dados.body.resultadoInvestimento.valIOF,
    //                 valImpostoRenda: dados.body.resultadoInvestimento.valImpostoRenda,
    //                 valInvestimentoInicial: dados.body.resultadoInvestimento.valInvestimentoInicial,
    //                 valSaldoBruto: dados.body.resultadoInvestimento.valSaldoBruto,
    //                 valSaldoLiquido: dados.body.resultadoInvestimento.valSaldoLiquido,
    //             });
    //     });
    // }

    btnAlterarInvestimento_Click() {
        console.log("Investimento.btnAlterarInvestimento_Click")
        this.setState({ 
            modalIsOpen: true,
        });
    }

    atualizarInvestimento(_tipoInvestimento, _valInvestimentoInicial, _indexador, _taxa, _dataInicial, _dataFinal) {
        console.log("Investimento.atualizarInvestimento indexador (ANTES): " + this.state.indexador + " Veio: " + _indexador)
        this.setState({ 
            tipoInvestimento: _tipoInvestimento,
            valInvestimentoInicial: _valInvestimentoInicial,
            indexador: _indexador,
            taxa: _taxa,
            dataInicial: _dataInicial,
            dataFinal: _dataFinal,
        });
        console.log("Investimento.atualizarInvestimento indexador (DEPOIS): " + this.state.indexador)
    }

    closeModal() {
        this.setState({ 
            modalIsOpen: false,
        });
    }

    render(){
        if (!this.state.valSaldoBruto) return this.renderLoading();
        return(
            <div>
                <div className="card ">
                    <div className="card-header">
                        { this.state.tipoInvestimento } { this.state.indexador } + { this.state.taxa } %
                    </div>
                    <ul className="list-group list-group-flush">
                        {console.log("this.state.valInvestimentoInicial: " + this.state.valInvestimentoInicial)}
                        <li className="list-group-item text-right">{ this.state.valInvestimentoInicial.toLocaleString("pt-BR", { style: "currency", currency: "BRL"}) }</li>
                        <li className="list-group-item text-right">{ this.state.valImpostoRenda.toLocaleString("pt-BR", { style: "currency", currency: "BRL"}) }</li>
                        <li className="list-group-item text-right">{ this.state.valSaldoBruto.toLocaleString("pt-BR", { style: "currency", currency: "BRL"}) }</li>
                        <li className="list-group-item text-right">{ this.state.valIOF.toLocaleString("pt-BR", { style: "currency", currency: "BRL"}) }</li>
                        <li className="list-group-item text-right">{ this.state.valSaldoLiquido.toLocaleString("pt-BR", { style: "currency", currency: "BRL"}) }</li>
                    </ul>
                    <div className="card-footer text-center">
                        <button type="button" className="btn btn-primary racinput1" onClick={this.btnAlterarInvestimento_Click}>Alterar Investimento</button>
                    </div>
                </div>
                <div>
                    {console.log("Investimento.render InvestimentoForm: " + this.state.tipoInvestimento)}
                    {console.log("Investimento.render InvestimentoForm: " + this.state.indexador)}
                    <InvestimentoForm 
                        modalIsOpen={this.state.modalIsOpen}
                        closeModal={this.closeModal}
                        onAtualizarInvestimentoRequest={this.onAtualizarInvestimentoRequest}
                        // investimento={this.state.investimento}
                        tipoInvestimento={this.state.tipoInvestimento}
                        valInvestimentoInicial={this.state.valInvestimentoInicial}
                        indexador={this.state.indexador}
                        taxa={this.state.taxa}
                        dataInicial={this.state.dataInicial}
                        dataFinal={this.state.dataFinal}
                    />
                </div>
            </div>
        )

    }

    renderLoading() {
        return (
            <div>
                <div className="card ">
                    <div className="card-header">
                        { this.state.tipoInvestimento } { this.state.indexador } + { this.state.taxa } %
                    </div>
                    <div className="card-body">Carregando...</div>
                    <div className="card-footer text-center">
                        <button type="button" className="btn btn-primary racinput1" onClick={this.btnAlterarInvestimento_Click}>Alterar Investimento</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Investimento;