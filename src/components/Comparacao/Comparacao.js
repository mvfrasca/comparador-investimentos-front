import React, { Component } from 'react';
import Investimento from '../Investimento/Investimento';
import InvestimentoForm from '../InvestimentoForm/InvestimentoForm';

class Comparacao extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            investimento: {},
            investimentos: [
                {
                    tipoInvestimento: "poupanca",
                    valInvestimentoInicial: 25000,
                    indexador: "poupanca",
                    taxa: 0,
                    dataInicial: "01/09/2014",
                    dataFinal: "01/09/2018"
                },
                {
                    tipoInvestimento: "cdb",
                    valInvestimentoInicial: 25000,
                    indexador: "ipca",
                    taxa: 5.57,
                    dataInicial: "01/09/2014",
                    dataFinal: "01/09/2018"
                }
            ]
        }
        this.investimentoClick = this.investimentoClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    investimentoClick = (e) => {
        const { target: { value } } = e;
        alert('Investimento: ' + this.state.investimentos[value].tipoInvestimento);
        this.setState({ 
            modalIsOpen: true,
            investimento: this.state.investimentos[value], 
        });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    componentDidMount() {

    }

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
                        />
                        <button type="button" className="btn btn-primary racinput1" onClick={this.investimentoClick} name="Investimento 0" value="0">Alterar Investimento</button>
                    </div>
                    <div className="col">
                        < Investimento
                            investimento={this.state.investimentos[1]}
                        />
                        <button type="button" className="btn btn-primary racinput1" onClick={this.investimentoClick} name="Investimento 1" value="1">Alterar Investimento</button>
                    </div>
                </div>
                <InvestimentoForm 
                    modalIsOpen={this.state.modalIsOpen}
                    closeModal={this.closeModal}
                    investimento={this.state.investimento} 
                />
            </div>
        )

    }
}

export default Comparacao;