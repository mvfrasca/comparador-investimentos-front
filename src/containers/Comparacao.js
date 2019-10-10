import React, { Component } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import Investimento from './../components/Investimento/Investimento';
import * as investimentosActions from '../store/investimentos/actions';
import { StatusEnum } from '../constants/base';
import './Comparacao.css'
import Chart from 'react-google-charts';
import uuid from 'uuid/v4';
// import * as investimentosSelectors from '../store/investimentos/reducer';

class Comparacao extends Component {
    constructor(props) {
        super(props);
        // let dataInicial = 
        this.state = {
            valInvestimentoInicial: 1000,
            // dataInicial: new Date().toISOString().substring(0,10),
            // dataFinal: undefined, //this.atualizarDataFinal(Date.now().toLocaleString('pt-BR', { timeZone: 'UTC' }), "m", 12),
            dataInicial: "2018-01-01",
            dataFinal: "2018-12-31",
            qtdPeriodos: "12",
            periodicidade: "m",
        }
        autoBind(this);        
    }

    componentDidMount() {
        // console.log("Comparacao.componentDidMount - dispatch consultarInvestimentos");
        this.props.dispatch(investimentosActions.consultarIndexadores());
        this.props.dispatch(investimentosActions.consultarInvestimentos());
    }

    // componentDidUpdate() {
    //     // this.props.investimentosList.map( 
    //     //     (investimento, indice) => {
    //     //         // console.log("Comparacao.componentDidUpdate - dispatch calcularInvestimento " + indice);
    //     //         if (investimento !== undefined) {
    //     //             this.props.dispatch(investimentosActions.calcularInvestimento(investimento));
    //     //         }
    //     //     }
    //     // )
    //     console.log("Comparacao.componentDidUpdate state: " + JSON.stringify(this.props.investimentosList))
    // }

    atualizarInvestimento(investimento) {
        // console.log("Comparacao.atualizarInvestimento: " + JSON.stringify(investimento));
        if (investimento.status === StatusEnum.INCLUINDO) {
            this.incluirInvestimento();
        }
        // this.props.dispatch(investimentosActions.atualizarInvestimento(investimento));
        this.props.dispatch(investimentosActions.calcularInvestimento(investimento));
        this.forceUpdate();
    }

    excluirInvestimento(investimento) {
        this.props.dispatch(investimentosActions.excluirInvestimento(investimento));
        this.forceUpdate();
    }

    atualizarEvolucao() {
        this.props.dispatch(investimentosActions.atualizarEvolucao());
        this.forceUpdate();
    }

    incluirInvestimento() {
        let investimentoIncluir = {
            id: uuid(),
            tipoInvestimento: "",
            tipoRendimento: "",
            valInvestimentoInicial: parseFloat(this.state.valInvestimentoInicial.toString().replace(".","").replace(",",".")),
            indexador: "",
            taxa: 100,
            taxaPrefixada: 0,
            dataInicial: this.state.dataInicial,
            dataFinal: this.state.dataFinal,
            status: StatusEnum.A_INCLUIR
        }
        this.props.dispatch(investimentosActions.incluirInvestimento(investimentoIncluir));
        this.forceUpdate();
    }

    atualizaInvestimentos(dataInicial, periodicidade, qtdPeriodos, dataFinal) {
        // console.log("Qtd Períodos: " + typeof(qtdPeriodos))
        if (dataInicial !== undefined && dataFinal !== undefined && periodicidade !== undefined && 
            qtdPeriodos !== undefined && qtdPeriodos.toString().trim() !== "") {
            
            // console.log("atualizaInvestimentos dados válidos");
            this.props.investimentosList.map( 
                (investimento, indice) => {
                    if (investimento !== undefined && investimento.status !== StatusEnum.A_INCLUIR) {
                        let investimentoAtualizar = {
                            ...investimento,
                            dataInicial: dataInicial,
                            dataFinal: dataFinal,
                            valInvestimentoInicial: parseFloat(this.state.valInvestimentoInicial.toString().replace(".","").replace(",",".")),
                        }
                        // console.log("atualizaInvestimentos investimento: " + JSON.stringify(investimentoAtualizar))
                        // this.props.dispatch(investimentosActions.atualizarInvestimento(investimento=investimentoAtualizar));
                        this.props.dispatch(investimentosActions.calcularInvestimento(investimento=investimentoAtualizar));
                    }
                }
            )
            this.forceUpdate();
        }
        else {
            // TODO: Mensagem de erro
            // console.log("atualizaInvestimentos dados invalidos dataFinal: " + dataFinal);
        }
    }

    handleChange = (e) => {
        const { target: { name, value } } = e;
        this.setState({
            [name]: [value],
        });
    }

    handleChangePeriodo = (e) => {
        const { target: { name, value } } = e;
        // console.log("handleChangePeriodo name: " + name);
        // console.log("handleChangePeriodo value: " + value);
        try{
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
            // console.log("handleChangePeriodo dataInicial: " + dataInicial);
            // console.log("handleChangePeriodo dataInicial tipo: " + typeof(dataInicial));
            // console.log("handleChangePeriodo periodicidade: " + periodicidade);
            // console.log("handleChangePeriodo periodicidade tipo: " + typeof(periodicidade));
            // console.log("handleChangePeriodo qtdPeriodos: " + qtdPeriodos);
            // console.log("handleChangePeriodo qtdPeriodos tipo: " + typeof(qtdPeriodos));
            // console.log("handleChangePeriodo dataFinal: " + dataFinal);
            
            if (dataInicial !== undefined && periodicidade !== undefined && 
                qtdPeriodos !== undefined && qtdPeriodos.trim() !== "") {
                if (name === "dataFinal"){
                    periodicidade = 'd';
                    let diff = new Date(dataFinal).getTime() - new Date(dataInicial).getTime();
                    qtdPeriodos = Math.ceil(diff / (1000 * 60 * 60 * 24));
                    this.setState({
                        periodicidade: periodicidade,
                        qtdPeriodos: qtdPeriodos,
                    });
                } else {
                    dataFinal = this.atualizarDataFinal(dataInicial, periodicidade, qtdPeriodos);
                    // console.log("handleChangePeriodo dados válidos dataFinal: " + dataFinal);
                }
            }
            this.setState({
                [name]: [value],
                dataFinal: dataFinal,
            });
        } catch (error) {
            console.error(error);
            this.setState({
                [name]: [value]
            });
        }
    }

    atualizarDataFinal = (dataInicial, periodicidade, qtdPeriodos) => {
        let dataFinal = new Date(dataInicial + ' 12:00:00');
        // console.log("Comparacao.atualizarDataFinal Data Inicial: " + dataInicial);
        // console.log("Comparacao.atualizarDataFinal Periodicidade: " + periodicidade);
        // console.log("Comparacao.atualizarDataFinal Qtd Períodos: " + qtdPeriodos);
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
                // console.log("Comparacao.atualizarDataFinal periodicidade inválida")
                return undefined;
        }
        // console.log("Comparacao.atualizarDataFinal Data Final calculada: " + dataFinal)
        // console.log("Comparacao.atualizarDataFinal Data Final formatada: " + dataFinal.toISOString().substring(0,10))
        return dataFinal.toISOString().substring(0,10)
        // document.formDadosInvest.dataFinal.value = dataFinal.toISOString().substring(0,10)
        // this.setState({
        //     dataFinal: dataFinal.toISOString().substring(0,10)
        // })
    };

    render() {
        // console.log("Comparacao.render")
        if (this.props.investimentosList === undefined) return this.renderLoading();
        return (
            <div>
                <br/>
                <div className="row justify-content-center">
                    <div className="col-10 col-lg-10 col-md-10 col-sm-10">
                        <div className="card-group">
                            <div className="card" style={{minWidth:"250px"}}>
                                <div className="card-header">
                                    <div className="form-row flex-nowrap">
                                        <div className="col align-middle ">
                                            <h6>Dados do investimento:</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body lista-comprimida">
                                    <br/><br/>
                                    <form name="formDadosInvest" className="needs-validation mb-3" onSubmit={this.atualizaInvestimentos} noValidate>
                                        <div className="form-row align-items-end justify-content-center">
                                            <div className="col-auto">
                                                <label className="pt-3" htmlFor="dataInicial">Valor a investir</label>
                                                <input type="text" className="form-control form-control-sm text-right" id="valInvestimentoInicial" name="valInvestimentoInicial" onChange={this.handleChange} value={this.state.valInvestimentoInicial} required />
                                                <div className="invalid-feedback">
                                                    Por favor informe o valor inicial do investimento.
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <label className="pt-3" htmlFor="dataInicial">Data Inicial</label>
                                                <input type="date" className="form-control form-control-sm" id="dataInicial" name="dataInicial" onChange={this.handleChangePeriodo} value={this.state.dataInicial} required />
                                                <div className="invalid-feedback">
                                                    Por favor informe a data inicial do investimento.
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <label className="pt-3" htmlFor="periodoInvestimento">Período de investimento</label>
                                                <div className="input-group" id="periodoInvestimento">
                                                    <input type="text" className="form-control form-control-sm w-25" id="qtdPeriodos" name="qtdPeriodos" onChange={this.handleChangePeriodo} value={this.state.qtdPeriodos} required />
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
                                                <label className="pt-3" htmlFor="dataFinal">Data do Vencimento</label>
                                                <input type="date" className="form-control form-control-sm" id="dataFinal" name="dataFinal" onChange={this.handleChangePeriodo} value={this.state.dataFinal} required/>
                                            </div>
                                            <div className="col-auto">
                                                <button type="button" className="btn btn-success justify-content-right mr-4" onClick={() => this.atualizaInvestimentos(this.state.dataInicial, this.state.periodicidade, this.state.qtdPeriodos, this.state.dataFinal)}>
                                                    <i className="fas fa-calculator"> Calcular</i> 
                                                </button>
                                            </div>
                                        </div>
                                        {/* <hr className="mb-4" /> */}
                                        {/* <button className="btn btn-primary btn-lg btn-block" type="submit" >Atualizar</button> */}
                                        {/* <button className="btn btn-primary btn-lg btn-block" type="button" onClick={() => this.props.onAtualizarInvestimentoRequest(this.state.investimento)}>Atualizar</button> */}
                                        
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="card-group">
                            {
                                this.props.investimentosList.map( 
                                    (investimento, indice) => {
                                        return (
                                            < Investimento key={"divInvestimento_" + indice}
                                                investimento={investimento}
                                                indexadores={this.props.indexadores}
                                                onAtualizarInvestimentoRequest={this.atualizarInvestimento}
                                                onExcluirInvestimentoRequest={this.excluirInvestimento}
                                            />
                                        )
                                    }
                                )
                            }
                        </div>
                        <div className="card" style={{minWidth:"250px"}}>
                            <div className="card-header">
                                Histórico de índices:
                            </div>
                            
                            <div className="card-body">
                                <Chart
                                    chartType="Line"
                                    width={'100%'}
                                    height={'90%'}
                                    data={this.props.evolucao}
                                    loader={<div className="spinner-border" role="status">
                                                <span className="sr-only">Carregando...</span>
                                            </div>}
                                    options={{
                                        chartArea: {
                                            width: '100%',
                                        },
                                        title: 'Histórico de Índices',
                                        vAxis: { format: '#.###,##'},
                                        // width: 900,
                                        // height: 200,
                                        // series: {
                                        //     // Gives each series an axis name that matches the Y-axis below.
                                        //     0: { axis: 'Selic' },
                                        //     1: { axis: 'CDI' },
                                        // },
                                        // axes: {
                                        //     // Adds labels to each axis; they don't have to match the axis names.
                                        //     y: {
                                        //     Selic: { label: '%' },
                                        //     CDI: { label: 'CDI' },
                                        //     },
                                        // },
                                    }}
                                    rootProps={{ 'data-testid': '1' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <p/>
            </div>
        )

    }

    renderLoading() {
        return (
            <div>
                <div className="card ">
                    <div className="card-header">
                       <div className="form-row flex-nowrap">
                        <div className="col align-middle ">
                            Carregando...
                        </div>
                    </div>
                    </div>
                    <div className="card-body d-flex align-items-center justify-content-center">
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Carregando...</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    // console.log("mapStateToProps state: " + JSON.stringify(state.investimentos.investimentosList))
    // console.log("Comparacao.mapStateToProps")
    return {
        investimentosList: state.investimentos.investimentosList,
        indexadores: state.investimentos.indexadores,
        evolucao: state.investimentos.evolucao,
    };
}

Comparacao.propTypes = {
    investimentosList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        tipoInvestimento: PropTypes.string.isRequired,
        tipoRendimento: PropTypes.string.isRequired,
        valInvestimentoInicial: PropTypes.number.isRequired,
        indexador: PropTypes.string.isRequired,
        taxa: PropTypes.number,
        taxaPrefixada: PropTypes.number,
        dataInicial: PropTypes.string.isRequired,
        dataFinal: PropTypes.string.isRequired,
        status: PropTypes.number.isRequired,
        // Resultado do investimento
        evolucao: PropTypes.arrayOf(PropTypes.shape({
            dtReferencia: PropTypes.string.isRequired,
            valIndice: PropTypes.number.isRequired,
            valSaldoBruto: PropTypes.number.isRequired,
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
    })),
    evolucao: PropTypes.Array,
}

export default connect(mapStateToProps)(Comparacao);