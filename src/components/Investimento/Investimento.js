import React, { Component } from 'react';
import autoBind from 'react-autobind';
import './Investimento.css'
//import { calcularInvestimento } from "../../services/investimento"
import InvestimentoForm from '../InvestimentoForm/InvestimentoForm';
import { StatusEnum } from  '../../constants/base';

class Investimento extends Component {
    constructor(props){
        // console.log("Investimento.constructor props.investimento.id:" + JSON.stringify(props.investimento === undefined ? "undefined" : props.investimento.id))
        console.log("Investimento.constructor")
        super(props);
        this.state = {
            // Controle do modal
            modalIsOpen: false,
        }
        autoBind(this);
    }

    btnAlterarInvestimento_Click() {
        console.log("Investimento.btnAlterarInvestimento_Click")
        this.setState({ 
            modalIsOpen: true,
        });
    }

    atualizarInvestimento(investimento) {
        // console.log("Investimento.atualizarInvestimento " + JSON.stringify(investimento))
        console.log("Investimento.atualizarInvestimento")
        this.props.onAtualizarInvestimentoRequest(investimento);
    }

    closeModal() {
        console.log("Investimento.closeModal()");
        this.setState({ 
            modalIsOpen: false,
        });
    }

    render(){
        if (this.props.investimento === undefined || this.props.investimento.status !== StatusEnum.CALCULADO) return this.renderLoading();
        return(
            <div>
                <div className="card ">
                    <div className="card-header">
                        { this.props.investimento.tipoInvestimento } { this.props.investimento.indexador } + { this.props.investimento.taxa } %
                    </div>
                    <ul className="list-group list-group-flush">
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
                        onAtualizarInvestimentoRequest={this.atualizarInvestimento}
                        investimento={this.props.investimento}
                        indexadores={this.props.indexadores}
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