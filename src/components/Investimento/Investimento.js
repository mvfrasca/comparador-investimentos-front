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
            <div className="card" style={{minWidth:"250px"}}>
                <div className="card-header">
                    <div className="form-row flex-nowrap">
                        <div className="col align-middle ">
                            <h6>{ this.props.investimento.tipoInvestimento } { this.props.investimento.indexador } + { this.props.investimento.taxa } %</h6>
                        </div>
                        <div className="col-auto">
                            <button type="button" className="btn justify-content-right" onClick={this.btnAlterarInvestimento_Click}>
                                <i className="fas fa-sliders-h"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-body lista-comprimida">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item text-right">
                            <div>
                                <small className="text-muted">Valor Bruto</small>
                                <h6 className="my-0">{ this.props.investimento.valSaldoBruto.toLocaleString("pt-BR", { style: "currency", currency: "BRL"}) }</h6>
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                            <div className="text-right">
                                <small className="text-muted">Alíquota de I.R.</small>
                                <h6 className="my-0">{ this.props.investimento.percImpostoRenda } %</h6>
                            </div>
                            <div className="text-right">
                                <small className="text-muted">Imposto de Renda</small>
                                <h6 className="my-0">{ this.props.investimento.valImpostoRenda.toLocaleString("pt-BR", { style: "currency", currency: "BRL"}) }</h6>
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                            <div className="text-right">
                                <small className="text-muted">Alíquota de IOF</small>
                                <h6 className="my-0">{ this.props.investimento.percIOF } %</h6>
                            </div>
                            <div className="text-right">
                                <small className="text-muted">Valor de IOF</small>
                                <h6 className="my-0">{ this.props.investimento.valIOF.toLocaleString("pt-BR", { style: "currency", currency: "BRL"}) }</h6>
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                            <div className="text-right">                              
                                <span className={"badge badge-".concat(this.props.investimento.id === 1 ? "success" : "danger")}>
                                    <i className={"far fa-thumbs-".concat(this.props.investimento.id === 1 ? "up" : "down")}></i>
                                </span>
                            </div>
                            <div className="text-right">
                                <small className="text-muted">Valor Líquido</small>
                                <h6 className="my-0">{ this.props.investimento.valSaldoLiquido.toLocaleString("pt-BR", { style: "currency", currency: "BRL"}) }</h6>
                            </div>
                        </li>
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