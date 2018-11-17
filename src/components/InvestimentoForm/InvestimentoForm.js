import React, { Component } from 'react';
import autoBind from 'react-autobind';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
};

class InvestimentoForm extends Component {
    constructor(props) {
        console.log("InvestimentoForm.constructor")
        super(props);
        this.state = {
            investimento: {
                id: props.investimento.id,
                tipoInvestimento: props.investimento.tipoInvestimento,
                valorInvestimentoInicial: props.investimento.valorInvestimentoInicial,
                indexador: props.investimento.indexador,
                taxa: props.investimento.taxa,
                dataInicial: props.investimento.dataInicial,
                dataFinal: props.investimento.dataFinal,
            }
        };

        // console.log("InvestimentoForm.constructor indexadores: " + JSON.stringify(this.state.indexadores))
        console.log("InvestimentoForm.constructor");
        autoBind(this);
    }
    
    atualizarInvestimento = (e) => {
        // console.log("InvestimentoForm.atualizarInvestimento: " + JSON.stringify(e));
        e.preventDefault();
        if (this.props.modalIsOpen) {
            // this.props.dispatch(this.state.indexador);
            this.props.onAtualizarInvestimentoRequest(this.state.investimento)
            this.props.closeModal()
        }
    }

    // change
    handleChange = (e) => {
        const { target: { name, value } } = e;
        var newInvestimento = this.state.investimento;
        newInvestimento[name] = value;
        this.setState({
            investimento: newInvestimento
        });
    };

    render() {
        // console.log("InvestimentoForm.render state: " + JSON.stringify(this.state))
        console.log("InvestimentoForm.render");
        if (!this.props.modalIsOpen) return(<div/>);
        return (
            <div>
                <Modal
                    isOpen={this.props.modalIsOpen}
                    onRequestClose={this.props.closeModal}
                    investimento={this.props.investimento}
                    style={customStyles}
                    contentLabel="Dados do Investimento"
                >

                    <div className="col-md-12 order-md-1 scroll">
                        <h4 className="mb-3">{this.state.investimento.tipoInvestimento}</h4>
                        <form className="needs-validation" onSubmit={this.atualizarInvestimento} noValidate>
                        {/* <form className="needs-validation" noValidate> */}
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="tipoInvestimento">Tipo de Investimento</label>
                                    <select className="custom-select d-block w-100 align-baseline" id="tipoInvestimento" name="tipoInvestimento" onChange={this.handleChange} value={this.state.investimento.tipoInvestimento} required>
                                    <option value="">Selecione...</option>
                                    <option value="cdb">CDB</option>
                                    <option value="lca">LCA</option>
                                    <option value="lci">LCI</option>
                                    <option value="poupanca">Poupança</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Por favor selecione um tipo de investimento.
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="indexador">Indexador</label>
                                    <select className="custom-select d-block w-100 align-baseline" id="indexador" name="indexador" onChange={this.handleChange} value={this.state.investimento.indexador} required>
                                    {/* <option name="indexador" value="">Selecione...</option> */}
                                    {
                                        this.props.indexadores.map((indexador, indice) => {
                                            return(
                                                <option id={"indexador_"+ indice} key={indice} value={indexador.id}>{indexador.nome}</option>
                                            )
                                        })
                                    }
                                    </select>
                                    <div className="invalid-feedback">
                                        Por favor selecione um indexador para o investimento.
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="taxa">Taxa</label>
                                    <input type="text" className="form-control align-baseline" id="taxa" name="taxa" placeholder="" onChange={this.handleChange} value={this.state.investimento.taxa} required />
                                    <div className="invalid-feedback">
                                        Por favor informe a taxa do investimento.
                                    </div>
                                </div>
                            </div>

                            {/* <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label for="firstName">First name</label>
                                    <input type="text" className="form-control" id="firstName" placeholder="" value="" required />
                                    <div className="invalid-feedback">
                                    Valid first name is required.
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label for="lastName">Last name</label>
                                    <input type="text" className="form-control" id="lastName" placeholder="" value="" required />
                                    <div className="invalid-feedback">
                                    Valid last name is required.
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label for="username">Username</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text">@</span>
                                    </div>
                                    <input type="text" className="form-control" id="username" placeholder="Username" required />
                                    <div className="invalid-feedback" style={{width: "100%"}}>
                                    Your username is required.
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label for="email">Email <span className="text-muted">(Optional)</span></label>
                                <input type="email" className="form-control" id="email" placeholder="you@example.com" />
                                <div className="invalid-feedback">
                                    Please enter a valid email address for shipping updates.
                                </div>
                            </div>

                            <div className="mb-3">
                                <label for="address">Address</label>
                                <input type="text" className="form-control" id="address" placeholder="1234 Main St" required />
                                <div className="invalid-feedback">
                                    Please enter your shipping address.
                                </div>
                            </div>

                            <div className="mb-3">
                                <label for="address2">Address 2 <span className="text-muted">(Optional)</span></label>
                                <input type="text" className="form-control" id="address2" placeholder="Apartment or suite" />
                            </div>

                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label for="country">Country</label>
                                    <select className="custom-select d-block w-100" id="country" required>
                                    <option value="">Choose...</option>
                                    <option>United States</option>
                                    </select>
                                    <div className="invalid-feedback">
                                    Please select a valid country.
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label for="state">State</label>
                                    <select className="custom-select d-block w-100" id="state" required>
                                        <option value="">Choose...</option>
                                        <option>California</option>
                                    </select>
                                    <div className="invalid-feedback">
                                    Please provide a valid state.
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label for="zip">Zip</label>
                                    <input type="text" className="form-control" id="zip" placeholder="" required />
                                    <div className="invalid-feedback">
                                    Zip code required.
                                    </div>
                                </div>
                            </div>
                            <hr className="mb-4" />
                                <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="same-address" />
                                <label className="custom-control-label" for="same-address">Shipping address is the same as my billing address</label>
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="save-info" />
                                <label className="custom-control-label" for="save-info">Save this information for next time</label>
                            </div>
                            <hr className="mb-4" />

                            <h4 className="mb-3">Payment</h4>

                            <div className="d-block my-3">
                                <div className="custom-control custom-radio">
                                    <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" checked required />
                                    <label className="custom-control-label" for="credit">Credit card</label>
                                </div>
                                <div className="custom-control custom-radio">
                                    <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required />
                                    <label className="custom-control-label" for="debit">Debit card</label>
                                </div>
                                <div className="custom-control custom-radio">
                                    <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" required />
                                    <label className="custom-control-label" for="paypal">PayPal</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label for="cc-name">Name on card</label>
                                    <input type="text" className="form-control" id="cc-name" placeholder="" required />
                                    <small className="text-muted">Full name as displayed on card</small>
                                    <div className="invalid-feedback">
                                    Name on card is required
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label for="cc-number">Credit card number</label>
                                    <input type="text" className="form-control" id="cc-number" placeholder="" required />
                                    <div className="invalid-feedback">
                                    Credit card number is required
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3 mb-3">
                                    <label for="cc-expiration">Expiration</label>
                                    <input type="text" className="form-control" id="cc-expiration" placeholder="" required />
                                    <div className="invalid-feedback">
                                    Expiration date required
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label for="cc-cvv">CVV</label>
                                    <input type="text" className="form-control" id="cc-cvv" placeholder="" required />
                                    <div className="invalid-feedback">
                                    Security code required
                                    </div>
                                </div> */}
                            <hr className="mb-4" />
                            <button className="btn btn-primary btn-lg btn-block" type="submit" >Atualizar</button>
                            {/* <button className="btn btn-primary btn-lg btn-block" type="button" onClick={() => this.props.onAtualizarInvestimentoRequest(this.state.investimento)}>Atualizar</button> */}
                        </form>
                    </div>
                </Modal >
                <br />
            </div >
        )
    }
}

Modal.setAppElement('body');

export default InvestimentoForm;