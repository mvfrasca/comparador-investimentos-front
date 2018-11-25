import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
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
            <div className="card">
                <div className="card-header">
                    <div className="form-row align-items-center">
                        <div className="col">
                            <h6>{ this.props.investimento.tipoInvestimento } { this.props.investimento.indexador } + { this.props.investimento.taxa } %</h6>
                        </div>
                        <div className="col-alto">
                            <button type="button" className="btn justify-content-right" onClick={this.btnAlterarInvestimento_Click}>
                                <i className="fas fa-sliders-h"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-body lista-comprimida">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item text-right">{ this.props.investimento.valInvestimentoInicial.toLocaleString("pt-BR", { style: "currency", currency: "BRL"}) }</li>
                        <li className="list-group-item text-right">{ this.props.investimento.valImpostoRenda.toLocaleString("pt-BR", { style: "currency", currency: "BRL"}) }</li>
                        <li className="list-group-item text-right">{ this.props.investimento.valSaldoBruto.toLocaleString("pt-BR", { style: "currency", currency: "BRL"}) }</li>
                        <li className="list-group-item text-right">{ this.props.investimento.valIOF.toLocaleString("pt-BR", { style: "currency", currency: "BRL"}) }</li>
                        <li className="list-group-item text-right">{ this.props.investimento.valSaldoLiquido.toLocaleString("pt-BR", { style: "currency", currency: "BRL"}) }</li>
                    </ul>
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

Investimento.propTypes = {
    investimento: PropTypes.shape({
        id: PropTypes.number.isRequired,
        tipoInvestimento: PropTypes.string.isRequired,
        valInvestimentoInicial: PropTypes.number.isRequired,
        indexador: PropTypes.string.isRequired,
        taxa: PropTypes.number,
        dataInicial: PropTypes.string.isRequired,
        dataFinal: PropTypes.string.isRequired,
        status: PropTypes.number.isRequired,
        // Resultado do investimento
        evolucao: PropTypes.arrayOf(PropTypes.shape({
            data: PropTypes.string.isRequired,
            indice: PropTypes.number.isRequired,
            valor: PropTypes.number.isRequired,
        })),
        percIOF: PropTypes.number,
        percImpostoRenda: PropTypes.number,
        rentabilidadeBruta: PropTypes.number,
        rentabilidadeLiquida: PropTypes.number,
        valIOF: PropTypes.number,
        valImpostoRenda: PropTypes.number,
        valSaldoBruto: PropTypes.number,
        valSaldoLiquido: PropTypes.number
    }),
    indexadores: PropTypes.arrayOf(PropTypes.shape({
        dt_ult_atualiz: PropTypes.string,
        dt_ult_referencia: PropTypes.string,
        id: PropTypes.string,
        nome: PropTypes.string,
        periodicidade: PropTypes.string,
        qtd_regs_ult_atualiz: PropTypes.number,
        serie: PropTypes.string
    }))
}

export default Investimento;