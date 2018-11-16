import React, { Component } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import Investimento from './../components/Investimento/Investimento';
import * as investimentosActions from '../store/investimentos/actions';
import * as investimentosSelectors from '../store/investimentos/reducer';

class Comparacao extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     investimentoList: []
        // }
        autoBind(this);
    }

    componentDidMount() {
        console.log("Comparacao.componentDidMount - dispatch consultarInvestimentos");
        this.props.dispatch(investimentosActions.consultarInvestimentos());
        console.log("Comparacao.componentDidMount - dispatch calcularInvestimento")
        this.props.dispatch(investimentosActions.calcularInvestimento(0));
        this.props.dispatch(investimentosActions.calcularInvestimento(1));
    }

    render() {
        console.log("Comparacao.render this.props.investimentosList: " + JSON.stringify(this.props.investimentosList))
        if (this.props.investimentosList == undefined) return this.renderLoading();
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-header">
                                Investimentos
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Valor do Investimento inicial</li>
                                <li className="list-group-item">Valor do Imposto de Renda</li>
                                <li className="list-group-item">Valor do Saldo Bruto</li>
                                <li className="list-group-item">Valor do IOF</li>
                                <li className="list-group-item">Valor do Saldo Líquido</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col">
                        < Investimento
                            investimento={this.props.investimentosList[0]}
                            onAtualizarInvestimentoRequest={(investimento) => investimentosActions.atualizarInvestimento(investimento)}
                        />
                    </div>
                    <div className="col">
                        < Investimento
                            investimento={this.props.investimentosList[1]}
                            onAtualizarInvestimentoRequest={(investimento) => investimentosActions.atualizarInvestimento(investimento)}
                        />
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
    console.log("mapStateToProps state: " + JSON.stringify(state))
    return {
        investimentosList: state.investimentos.investimentosList,
    };
}

export default connect(mapStateToProps)(Comparacao);