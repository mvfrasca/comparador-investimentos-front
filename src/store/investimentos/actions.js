import _ from 'lodash';
// import Immutable from 'seamless-immutable';
import * as types from '../../constants/actionTypes';
import investimentoService from "../../services/investimento";

export function calcularInvestimento(investimentoCalcular) {
    return async (dispatch, getState) => {
        try {
            if (!investimentoCalcular.calculado) {
                // console.log("investimentos.actions.calcularInvestimento(" + id + ")");
                console.log("investimentos.actions.calcularInvestimento  investimentoCalcular: " + JSON.stringify(investimentoCalcular));
                let investimentoStore = getState().investimentos.investimentosList[investimentoCalcular.id]
                let investimentoCalculado = await investimentoService.calcularInvestimento(investimentoCalcular);
                investimentoCalculado.calculado = true;
                let investimento = _.assign({}, investimentoStore, investimentoCalculado)
                // console.log("investimentos.actions.calcularInvestimento investimento: " + JSON.stringify(investimento))
                // console.log("investimentos.actions.calcularInvestimento investimentosList[id]: " + JSON.stringify(newInvestimentosList))
                dispatch({ type: types.ATUALIZAR_INVESTIMENTO, investimento });
            }
        } catch (error) {
            console.error(error);
        }
    };
}

export function atualizarInvestimento(investimentoAtualizar) {
    return async (dispatch, getState) => {
        try {
            console.log("actions atualizarInvestimento fora: " + JSON.stringify(investimentoAtualizar));
            let investimentoStore = getState().investimentos.investimentosList[investimentoAtualizar.id]
            investimentoAtualizar.calculado = false;
            let investimento = _.assign({}, investimentoStore, investimentoAtualizar)
            dispatch({ type: types.ATUALIZAR_INVESTIMENTO, investimento });
        } catch (error) {
            console.error(error);
        }
    };
    // return async (dispatch, getState) => {
    //     try {
    //         console.log("actions atualizarInvestimento: " + JSON.stringify(investimento));
    //         dispatch({ type: types.ATUALIZAR_INVESTIMENTO, investimento });
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };
}

export function consultarInvestimentos() {
    return async (dispatch, getState) => {
        try {
            // console.log("investimentos.actions.consultarInvestimentos()");
            const investimentosList = [
                {
                    id: 0,
                    tipoInvestimento: "poupanca",
                    valInvestimentoInicial: 25000,
                    indexador: "poupanca",
                    taxa: 0,
                    dataInicial: "01/09/2014",
                    dataFinal: "01/09/2018",
                    calculado: false
                },
                {
                    id: 1,
                    tipoInvestimento: "cdb",
                    valInvestimentoInicial: 25000,
                    indexador: "ipca",
                    taxa: 5.57,
                    dataInicial: "01/09/2014",
                    dataFinal: "01/09/2018",
                    calculado: false
                }
            ]
            dispatch({ type: types.RECEBER_INVESTIMENTOS, investimentosList });
        } catch (error) {
            console.error(error);
        }
    };
}

