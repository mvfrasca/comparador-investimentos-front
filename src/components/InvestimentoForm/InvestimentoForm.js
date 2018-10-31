import React, { Component } from 'react';
//import { calcularInvestimento } from "../../services/investimento";
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
        super(props);
        this.state = {
            investimento: {
                tipoInvestimento: props.investimento.tipoInvestimento,
                valor: props.investimento.valor,
                indexador: props.investimento.indexador,
                taxa: props.investimento.taxa,
                dataInicial: props.investimento.dataInicial,
                dataFinal: props.investimento.dataFinal
            },
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.modalIsOpen}
                    onRequestClose={this.props.closeModal}
                    investimento={this.props.investimento}
                    style={customStyles}
                    contentLabel="Dados do Investimento"
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6 col-lg-4">
                                <p>{this.state.investimento.tipoInvestimento}</p>
                            </div>
                        </div>
                    </div>
                    {/* <form id="formu" style={{ display: 'block' }} onSubmit={this.handleSubmit1}>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-6 col-lg-4">
                                    <div className="form-group">
                                        <label className="form-label"   > &nbsp;Nome</label>

                                        <input className="form-control"
                                            maxLength="75"
                                            type="text"
                                            value={this.state.nome}
                                            name="nome"
                                            placeholder="Entre com o nome"
                                            onChange={this.handleChange}
                                            required
                                            title="Somente letras e espaços" />

                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-3">

                                    <div className="form-group">
                                        <label className="form-label">CPF </label>

                                        <input value={this.state.cpf} type="text" className="form-control" id="cpf" name="cpf" onChange={this.handleChange} placeholder="Ex: 000.000.000-00" required pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" title=" CPF no formato nnn.nnn.nnn-nn" />
                                    </div>
                                </div>

                                <div className="col-sm-6 col-lg-3">
                                    <div className="form-group">
                                        <label className="form-label">Data de Nasc</label>
                                        <input type="date" value={this.state.data_nascimento} onChange={this.handleChange} className="form-control" id="data_nascimento" name="data_nascimento" maxlenght="4" placeholder="dd/mm/aaa" required pattern="[0-9]{2}\/[0-9]{2}\/[0-9]{4}$" />
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-2">
                                    <div className="form-group">
                                        <label className="form-label">Agência</label>
                                        <input value={this.state.agencia} type="text" className="form-control " onChange={this.handleChange} id="agencia" name="agencia" maxlenght="5" placeholder=" Ex 1234-5.." required pattern="\d{4}-\d{1}" maxlengt="6" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6 col-lg-3">

                                    <div className="form-group">
                                        <label className="form-label">Conta Corrente </label>
                                        <input value={this.state.conta_corrente} type="text" className="form-control" onChange={this.handleChange} id="conta_corrente" name="conta_corrente" placeholder="Número da Conta.." required />
                                    </div>
                                </div>

                                <div className="col-sm-6 col-lg-3">
                                    <div className="form-group">
                                        <label className="form-label">Telefone</label>
                                        <input value={this.state.telefone} type="text" className="form-control" id="telefone" onChange={this.handleChange} name="telefone" maxlenght="11" placeholder="Telefone...." required pattern="\d{11}" title="Digite o Telefone com 11 dígitos . DDD + Números. Ex:01112345678 ou 11123456789" />
                                    </div>
                                </div>

                                <div className="col-sm-12 col-lg-6">
                                    <div className="form-group">
                                        <label className="form-label">E-mail</label>
                                        <input value={this.state.email} type="email" className="form-control " id="email" name="email" maxlenght="5" onChange={this.handleChange} placeholder="nome@email.com" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" title="exemplo usuario@ dominio (dominio é sempre nome +ponto + texto)" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="button-group">
                                        <button type="submit" className="btn btn-primary racinput1">Enviar</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </form> */}
                </Modal >
                <br />
            </div >
        )

    }
}

export default InvestimentoForm;