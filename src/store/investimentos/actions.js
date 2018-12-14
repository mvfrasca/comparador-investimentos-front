import _ from 'lodash';
// import Immutable from 'seamless-immutable';
import * as types from '../../constants/actionTypes';
import investimentoService from "../../services/investimento";
import { StatusEnum } from  '../../constants/base';

export function calcularInvestimento(investimentoCalcular) {
    // console.log("investimentos.actions.calcularInvestimento  investimentoCalcular: " + JSON.stringify(investimentoCalcular));
    return async (dispatch, getState) => {
        try {
            if (investimentoCalcular.status === StatusEnum.A_CALCULAR) {
                // console.log("investimentos.actions.calcularInvestimento(" + id + ")");
                // console.log("investimentos.actions.calcularInvestimento  investimentoCalcular: " + JSON.stringify(investimentoCalcular));
                console.log("investimentos.actions.calcularInvestimento");
                investimentoCalcular = _.assign({}, investimentoCalcular, {status: StatusEnum.CALCULANDO});
                dispatch({ type: types.ATUALIZAR_INVESTIMENTO, investimento: investimentoCalcular });
                let investimentoStore = getState().investimentos.investimentosList[investimentoCalcular.id]
                let investimentoCalculado = await investimentoService.calcularInvestimento(investimentoCalcular);
                investimentoCalculado.status = StatusEnum.CALCULADO;
                investimentoCalculado = _.assign({}, investimentoStore, investimentoCalculado)
                // console.log("investimentos.actions.calcularInvestimento investimento: " + JSON.stringify(investimento))
                // console.log("investimentos.actions.calcularInvestimento investimentosList[id]: " + JSON.stringify(newInvestimentosList))
                dispatch({ type: types.ATUALIZAR_INVESTIMENTO, investimento: investimentoCalculado });
            }
        } catch (error) {
            console.error(error);
        }
    };
}

export function atualizarInvestimento(investimentoAtualizar) {
    return async (dispatch, getState) => {
        try {
            // console.log("actions atualizarInvestimento: " + JSON.stringify(investimentoAtualizar));
            console.log("actions atualizarInvestimento");
            let investimentoStore = getState().investimentos.investimentosList[investimentoAtualizar.id]
            investimentoAtualizar.status = StatusEnum.A_CALCULAR;
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
                    dataInicial: "2014-09-01",
                    dataFinal: "2018-09-01",
                    status: StatusEnum.A_CALCULAR
                },
                {
                    id: 1,
                    tipoInvestimento: "cdb",
                    valInvestimentoInicial: 25000,
                    indexador: "ipca",
                    taxa: 5.57,
                    dataInicial: "2014-09-01",
                    dataFinal: "2018-09-01",
                    status: StatusEnum.A_CALCULAR
                }
            ]
            dispatch({ type: types.RECEBER_INVESTIMENTOS, investimentosList });
        } catch (error) {
            console.error(error);
        }
    };
}

export function consultarIndexadores() {
    return async (dispatch, getState) => {
        try {
            console.log("investimentos.actions.consultarIndexadores");
            let indexadores = await investimentoService.getIndexadores();
            indexadores = indexadores.sort(
                function(a, b){
                    if(a.nome < b.nome) { return -1; }
                    if(a.nome > b.nome) { return 1; }
                    return 0;
                }
            )
            dispatch({ type: types.RECEBER_INDEXADORES, indexadores });
        } catch (error) {
            console.error(error);
        }
    };
}