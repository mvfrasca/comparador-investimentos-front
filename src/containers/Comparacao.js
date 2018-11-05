import React, { Component } from 'react';
import { connect } from 'react-redux';
import Investimento from './../components/Investimento/Investimento';
import * as investimentosActions from '../store/investimentos/actions';
import * as investimentosSelectors from '../store/investimentos/reducer';

class Comparacao extends Component {
    constructor(props) {
        super(props);
        this.state = {
            investimentos: []
        }
    }

    componentDidMount() {
        investimentosActions.consultarInvestimentos();
        investimentosActions.calcularInvestimento(0);
    }

    atualizarInvestimento

    render() {
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
                            investimento={this.state.investimentos[0]}
                            onAddToCartClicked={() => addToCart(0)} />
                        />
                    </div>
                    <div className="col">
                        < Investimento
                            investimento={this.state.investimentos[1]}
                        />
                    </div>
                </div>
            </div>
        )

    }

}

function mapStateToProps(store) {
    return {
        investimentos: store.investimentos.investimentosList,
    };
}

export default connect(mapStateToProps)(Comparacao);