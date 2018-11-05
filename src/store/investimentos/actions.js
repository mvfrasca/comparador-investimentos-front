import _ from 'lodash';
import Immutable from 'seamless-immutable';
import * as types from '../../constants/actionTypes';
import investimentoService from "../../services/investimento";

export function calcularInvestimento(id) {
    return async (dispatch, getState) => {
        try {
            console.log("investimentos.actions.calcularInvestimento()");
            const investimentos = getState.investimentosList
            investimentos[id] = await investimentoService.calcularInvestimento(...investimentos[id]);
            dispatch({ type: types.CALCULAR_INVESTIMENTO, investimentos });
        } catch (error) {
            console.error(error);
        }
    };
}

export function consultarInvestimentos() {
    return async (dispatch, getState) => {
        try {
            console.log("investimentos.actions.consultarInvestimentos()");
            const investimentos = [
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
            dispatch({ type: types.RECEBER_INVESTIMENTOS, investimentos });
        } catch (error) {
            console.error(error);
        }
    };
}

