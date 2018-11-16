import _ from 'lodash';
import Immutable from 'seamless-immutable';
import * as types from '../../constants/actionTypes';
import investimentoService from "../../services/investimento";

export function calcularInvestimento(id) {
    return async (dispatch, getState) => {
        try {
            // console.log("investimentos.actions.calcularInvestimento(" + id + ")");
            // console.log("investimentos.actions.calcularInvestimento getState() " + JSON.stringify(getState().investimentos.investimentosList[id]));
            var investimentosList = getState().investimentos.investimentosList
            // console.log("investimentosList[id].indexador: " + investimentosList[id].indexador)
            var investimento = await investimentoService.calcularInvestimento(investimentosList[id].tipoInvestimento, investimentosList[id].valInvestimentoInicial, investimentosList[id].indexador, investimentosList[id].taxa, investimentosList[id].dataInicial, investimentosList[id].dataFinal);
            investimento.calculado = true;
            var investimento = _.assign({}, investimentosList[id], investimento)
            // console.log("investimentos.actions.calcularInvestimento investimento: " + JSON.stringify(investimento))
            // console.log("investimentos.actions.calcularInvestimento investimentosList[id]: " + JSON.stringify(newInvestimentosList))
            dispatch({ type: types.CALCULAR_INVESTIMENTO, investimento });
        } catch (error) {
            console.error(error);
        }
    };
}

export function atualizarInvestimento(investimento) {
    return async (dispatch, getState) => {
        dispatch({ type: types.ATUALIZAR_INVESTIMENTO, investimento });
    }
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

