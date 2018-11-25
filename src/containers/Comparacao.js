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
            valInvestimentoInicial: 0,
            dataInicial: "",
            dataFinal: "",
            qtdPeriodos: 0,
            periodicidade: "",
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
                console.log("Comparacao.componentDidMount - dispatch calcularInvestimento " + indice);
                if (investimento !== undefined) {
                    this.props.dispatch(investimentosActions.calcularInvestimento(investimento));
                }
            }
        )
    }

    atualizarInvestimento(investimento) {
        this.props.dispatch(investimentosActions.atualizarInvestimento(investimento));
    }

    handleChange = (e) => {
        const { target: { name, value } } = e;
        this.setState({
            [name]: [value]
        });
    };

    render() {
        console.log("Comparacao.render")
        if (this.props.investimentosList === undefined) return this.renderLoading();
        return (
            <div>
                <p/>
                <p>Informe o valor e período de investimento:</p>
                <form className="needs-validation mb-3" onSubmit="" noValidate>
                    <div className="form-row align-items-center justify-content-center">
                        <div className="col-auto">
                            <label htmlFor="dataInicial">Valor a investir</label>
                            <input type="text" className="form-control form-control-sm text-right" id="dataInicial" name="dataInicial" placeholder="5.000,00" onChange={this.handleChange} value={this.state.dataInicial} required />
                            <div className="invalid-feedback">
                                Por favor informe o valor inicial do investimento.
                            </div>
                        </div>
                        <div className="col-auto">
                            <label htmlFor="dataInicial">Data Inicial</label>
                            <input type="date" className="form-control form-control-sm" id="dataInicial" name="dataInicial" placeholder={Date.now().toLocaleString('pt-BR', { timeZone: 'UTC' })} onChange={this.handleChange} value={this.state.dataInicial} required />
                            <div className="invalid-feedback">
                                Por favor informe a data inicial do investimento.
                            </div>
                        </div>
                        <div className="col-auto">
                            <label htmlFor="periodoInvestimento">Período de investimento</label>
                            <div className="input-group" id="periodoInvestimento">
                                <input type="text" className="form-control form-control-sm w-25" id="qtdPeriodos" name="qtdPeriodos" placeholder="12" onChange={this.handleChange} value={this.state.qtdPeriodos} required />
                                <div className="invalid-feedback">
                                    Por favor informe o período do investimento.
                                </div>
                                <div className="input-group-append" id="periodoInvestimento">
                                    <select className="form-control form-control-sm" id="periodicidade" name="periodicidade" onChange={this.handleChange} value={this.state.periodicidade} required>
                                        <option value="d">dias</option>
                                        <option value="m">meses</option>
                                        <option value="a">anos</option>
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
                <div className="card-group">
                    <div className="card">
                        <div className="card-header">
                            <h6>Investimentos</h6>
                        </div>
                        <div className="card-body lista-comprimida">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Valor do Investimento inicial</li>
                                <li className="list-group-item">Valor do Imposto de Renda</li>
                                <li className="list-group-item">Valor do Saldo Bruto</li>
                                <li className="list-group-item">Valor do IOF</li>
                                <li className="list-group-item">Valor do Saldo Líquido</li>
                            </ul>
                        </div>
                    </div>
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