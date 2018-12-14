import React, { Component } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import Investimento from './../components/Investimento/Investimento';
import * as investimentosActions from '../store/investimentos/actions';
import { StatusEnum } from '../constants/base';
import './Comparacao.css'
// import * as investimentosSelectors from '../store/investimentos/reducer';

class Comparacao extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valInvestimentoInicial: undefined,
            dataInicial: new Date().toISOString().substring(0,10),
            dataFinal: undefined,
            qtdPeriodos: undefined,
            periodicidade: "m",
        }
        autoBind(this);        
    }

    componentDidMount() {
        console.log("Comparacao.componentDidMount - dispatch consultarInvestimentos");
        this.props.dispatch(investimentosActions.consultarIndexadores());
        this.props.dispatch(investimentosActions.consultarInvestimentos());
    }

    componentDidUpdate() {
        this.props.investimentosList.map( 
            (investimento, indice) => {
                console.log("Comparacao.componentDidUpdate - dispatch calcularInvestimento " + indice);
                if (investimento !== undefined) {
                    this.props.dispatch(investimentosActions.calcularInvestimento(investimento));
                }
            }
        )
        console.log("Comparacao.componentDidUpdate state.dataFinal: " + this.state.dataFinal)
    }

    atualizarInvestimento(investimento) {
        this.props.dispatch(investimentosActions.atualizarInvestimento(investimento));
    }

    handleChange = (e) => {
        const { target: { name, value } } = e;
        this.setState({
            [name]: [value],
        });
    }

    handleChangePeriodo = (e) => {
        const { target: { name, value } } = e;
        console.log("handleChangePeriodo name: " + name)
        console.log("handleChangePeriodo value: " + value)

        let dataInicial = typeof(this.state.dataInicial) === "object" ? this.state.dataInicial.toString() : this.state.dataInicial
        let periodicidade = typeof(this.state.periodicidade) === "object" ? this.state.periodicidade.toString() : this.state.periodicidade
        let qtdPeriodos = typeof(this.state.qtdPeriodos) === "object" ? this.state.qtdPeriodos.toString() : this.state.qtdPeriodos
        let dataFinal = typeof(this.state.dataFinal) === "object" ? this.state.dataFinal.toString() : this.state.dataFinal
        switch (name) {
            case "dataInicial":
                dataInicial = value
                break;
            case "periodicidade":
                periodicidade = value
                break;
            case "qtdPeriodos":
                qtdPeriodos = value
                break;
        }
        console.log("handleChangePeriodo dataInicial: " + dataInicial)
        console.log("handleChangePeriodo dataInicial tipo: " + typeof(dataInicial))
        console.log("handleChangePeriodo periodicidade: " + periodicidade)
        console.log("handleChangePeriodo periodicidade tipo: " + typeof(periodicidade))
        console.log("handleChangePeriodo qtdPeriodos: " + qtdPeriodos)
        console.log("handleChangePeriodo qtdPeriodos tipo: " + typeof(qtdPeriodos))
        console.log("handleChangePeriodo dataFinal: " + dataFinal)

        if (dataInicial !== undefined && periodicidade !== undefined && 
            qtdPeriodos !== undefined && qtdPeriodos.trim() !== "") {
            dataFinal = this.atualizarDataFinal(dataInicial, periodicidade, qtdPeriodos);
            console.log("handleChangePeriodo dados validos dataFinal: " + dataFinal);
            this.props.investimentosList.map( 
                (investimento, indice) => {
                    if (investimento !== undefined) {
                        let investimentoAtualizar = {
                            ...investimento,
                            dataInicial: dataInicial,
                            dataFinal: dataFinal,
                            valInvestimentoInicial: this.state.valInvestimentoInicial,
                        }
                        console.log("handleChangePeriodo investimento: " + JSON.stringify(investimentoAtualizar))
                        this.props.dispatch(investimentosActions.atualizarInvestimento(investimento=investimentoAtualizar));
                    }
                }
            )
        }
        else {
            dataFinal = dataInicial;
            console.log("handleChangePeriodo dados invalidos dataFinal: " + dataFinal);
        }
        
        this.setState({
            [name]: [value],
            dataFinal: dataFinal,
        });
    }

    atualizarDataFinal = (dataInicial, periodicidade, qtdPeriodos) => {
        let dataFinal = new Date(this.state.dataInicial + ' 12:00:00');
        console.log("Comparacao.atualizarDataFinal Data Inicial: " + dataInicial);
        console.log("Comparacao.atualizarDataFinal Periodicidade: " + periodicidade);
        console.log("Comparacao.atualizarDataFinal Qtd Períodos: " + qtdPeriodos);
        switch(periodicidade) {
            case 'd':
                dataFinal.setDate(dataFinal.getDate() + parseInt(qtdPeriodos));
                break;
            case 'm':
                dataFinal.setMonth(dataFinal.getMonth() + parseInt(qtdPeriodos));
                break;
            case 'a':
                dataFinal.setYear(dataFinal.getYear() + 1900 + parseInt(qtdPeriodos));
                break;
            default:
                console.log("Comparacao.atualizarDataFinal periodicidade inválida")
                return undefined;
        }
        console.log("Comparacao.atualizarDataFinal Data Final calculada: " + dataFinal)
        console.log("Comparacao.atualizarDataFinal Data Final formatada: " + dataFinal.toISOString().substring(0,10))
        return dataFinal.toISOString().substring(0,10)
        // document.formDadosInvest.dataFinal.value = dataFinal.toISOString().substring(0,10)
        // this.setState({
        //     dataFinal: dataFinal.toISOString().substring(0,10)
        // })
    };

    render() {
        console.log("Comparacao.render")
        if (this.props.investimentosList === undefined) return this.renderLoading();
        return (
            <div>
                <p/>
                <p>Informe o valor e período de investimento:</p>
                <form name="formDadosInvest" className="needs-validation mb-3" noValidate>
                    <div className="form-row align-items-center justify-content-center">
                        <div className="col-auto">
                            <label htmlFor="dataInicial">Valor a investir</label>
                            <input type="text" className="form-control form-control-sm text-right" id="valInvestimentoInicial" name="valInvestimentoInicial" placeholder="5.000,00" onChange={this.handleChange} value={this.state.valInvestimentoInicial} required />
                            <div className="invalid-feedback">
                                Por favor informe o valor inicial do investimento.
                            </div>
                        </div>
                        <div className="col-auto">
                            <label htmlFor="dataInicial">Data Inicial</label>
                            <input type="date" className="form-control form-control-sm" id="dataInicial" name="dataInicial" placeholder={Date.now().toLocaleString('pt-BR', { timeZone: 'UTC' })} onChange={this.handleChangePeriodo} value={this.state.dataInicial} required />
                            <div className="invalid-feedback">
                                Por favor informe a data inicial do investimento.
                            </div>
                        </div>
                        <div className="col-auto">
                            <label htmlFor="periodoInvestimento">Período de investimento</label>
                            <div className="input-group" id="periodoInvestimento">
                                <input type="text" className="form-control form-control-sm w-25" id="qtdPeriodos" name="qtdPeriodos" placeholder="12" onChange={this.handleChangePeriodo} value={this.state.qtdPeriodos} required />
                                <div className="invalid-feedback">
                                    Por favor informe o período do investimento.
                                </div>
                                <div className="input-group-append" id="periodoInvestimento">
                                    <select className="form-control form-control-sm" id="periodicidade" name="periodicidade" onChange={this.handleChangePeriodo} value={this.state.periodicidade} required>
                                        <option value="a">ano(s)</option>
                                        <option value="d">dia(s)</option>
                                        <option value="m">mês(es)</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Por favor selecione a periodicidade de investimento.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-auto">
                            <label htmlFor="dataInicial">Data do Vencimento</label>
                            <input type="date" className="form-control form-control-sm" id="dataFinal" name="dataFinal" onChange={this.handleChange} value={this.state.dataFinal} readOnly/>
                        </div>
                    </div>
                    {/* <hr className="mb-4" /> */}
                    {/* <button className="btn btn-primary btn-lg btn-block" type="submit" >Atualizar</button> */}
                    {/* <button className="btn btn-primary btn-lg btn-block" type="button" onClick={() => this.props.onAtualizarInvestimentoRequest(this.state.investimento)}>Atualizar</button> */}
                </form>
                <p/>
                <p>Selecione até 3 investimentos a serem comparados:</p>
                <div >
                    <div className="row justify-content-center">
                        <div className="col-10 col-lg-10 col-md-10 col-sm-10">
                            <div className="card-group">
                                {
                                    this.props.investimentosList.map( 
                                        (investimento, indice) => {
                                            return (
                                                < Investimento key={"divInvestimento_" + indice}
                                                    investimento={investimento}
                                                    indexadores={this.props.indexadores}
                                                    onAtualizarInvestimentoRequest={this.atualizarInvestimento}
                                                />
                                            )
                                        }
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

    renderLoading() {
        return (
            <div>
                <div className="card ">
                   Carregando...
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    // console.log("mapStateToProps state: " + JSON.stringify(state))
    console.log("Comparacao.mapStateToProps")
    return {
        investimentosList: state.investimentos.investimentosList,
        indexadores: state.investimentos.indexadores,
    };
}

Comparacao.propTypes = {
    investimentosList: PropTypes.arrayOf(PropTypes.shape({
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
    })).isRequired,
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

export default connect(mapStateToProps)(Comparacao);