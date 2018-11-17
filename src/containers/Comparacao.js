import React, { Component } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import Investimento from './../components/Investimento/Investimento';
import * as investimentosActions from '../store/investimentos/actions';
// import * as investimentosSelectors from '../store/investimentos/reducer';

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

    render() {
        console.log("Comparacao.render")
        if (this.props.investimentosList === undefined) return this.renderLoading();
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
                    {
                        this.props.investimentosList.map( 
                            (investimento, indice) => {
                                return (
                                <div key={"divInvestimento_" + indice} className="col">
                                    < Investimento
                                        investimento={investimento}
                                        indexadores={this.props.indexadores}
                                        onAtualizarInvestimentoRequest={this.atualizarInvestimento}
                                    />
                                </div>
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

export default connect(mapStateToProps)(Comparacao);