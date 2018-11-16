import React, { Component } from 'react';
import autoBind from 'react-autobind';
import './Investimento.css'
//import { calcularInvestimento } from "../../services/investimento"
import InvestimentoForm from '../InvestimentoForm/InvestimentoForm';

class Investimento extends Component {
    constructor(props){
        console.log("Investimento.constructor props:" + JSON.stringify(props))
        super(props);
        this.state = {
            // Controle do modal
            modalIsOpen: false,
        }
        autoBind(this);
    }

    componentDidUpdate(){
        console.log("Investimento.componentDidUpdate this.props: " + JSON.stringify(this.props) )
        // onAtualizarInvestimentoRequest(this.state.id)
    }

    btnAlterarInvestimento_Click() {
        console.log("Investimento.btnAlterarInvestimento_Click")
        this.setState({ 
            modalIsOpen: true,
        });
    }

    // atualizarInvestimento(_tipoInvestimento, _valInvestimentoInicial, _indexador, _taxa, _dataInicial, _dataFinal) {
    //     console.log("Investimento.atualizarInvestimento indexador (ANTES): " + this.state.indexador + " Veio: " + _indexador)
    //     this.setState({ 
    //         tipoInvestimento: _tipoInvestimento,
    //         valInvestimentoInicial: _valInvestimentoInicial,
    //         indexador: _indexador,
    //         taxa: _taxa,
    //         dataInicial: _dataInicial,
    //         dataFinal: _dataFinal,
    //     });
    //     console.log("Investimento.atualizarInvestimento indexador (DEPOIS): " + this.state.indexador)
    // }

    closeModal() {
        this.setState({ 
            modalIsOpen: false,
        });
    }

    render(){
        if (this.props.investimento == undefined || !this.props.investimento.calculado) return this.renderLoading();
        return(
            <div>
                <div className="card ">
                    <div className="card-header">
                        { this.props.investimento.tipoInvestimento } { this.props.investimento.indexador } + { this.props.investimento.taxa } %
                    </div>
                    <ul className="list-group list-group-flush">
                        {console.log("this.investimento: " + JSON.stringify(this.props))}
                        {console.log("this.investimento: " + JSON.stringify(this.props.investimento.valInvestimentoInicial))}
                        <li className="list-group-item text-right">{ this.props.investimento.valInvestimentoInicial.toLocaleString("pt-BR", { style: "currency", currency: "BRL"}) }</li>
                        <li className="list-group-item text-right">{ this.props.investimento.valImpostoRenda.toLocaleString("pt-BR", { style: "currency", currency: "BRL"}) }</li>
                        <li className="list-group-item text-right">{ this.props.investimento.valSaldoBruto.toLocaleString("pt-BR", { style: "currency", currency: "BRL"}) }</li>
                        <li className="list-group-item text-right">{ this.props.investimento.valIOF.toLocaleString("pt-BR", { style: "currency", currency: "BRL"}) }</li>
                        <li className="list-group-item text-right">{ this.props.investimento.valSaldoLiquido.toLocaleString("pt-BR", { style: "currency", currency: "BRL"}) }</li>
                    </ul>
                    <div className="card-footer text-center">
                        <button type="button" className="btn btn-primary racinput1" onClick={this.btnAlterarInvestimento_Click}>Alterar Investimento</button>
                    </div>
                </div>
                <div>
                    {console.log("Investimento.render InvestimentoForm: " + this.props.investimento.tipoInvestimento)}
                    {console.log("Investimento.render InvestimentoForm: " + this.props.investimento.indexador)}
                    <InvestimentoForm 
                        modalIsOpen={this.state.modalIsOpen}
                        closeModal={this.closeModal}
                        onAtualizarInvestimentoRequest={this.props.onAtualizarInvestimentoRequest}
                        investimento={this.props.investimento}
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