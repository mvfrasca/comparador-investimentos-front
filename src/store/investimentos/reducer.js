import _ from 'lodash';
import * as types from '../../constants/actionTypes';
// import Immutable from 'seamless-immutable';
import { StatusEnum } from  '../../constants/base';
// import investimento from '../../services/investimento';

const initialState = {
    investimentosList: [
        {
            id: "",
            tipoInvestimento: "",
            tipoRendimento: "",
            valInvestimentoInicial: 0,
            indexador: "",
            taxa: 0,
            taxaPrefixada: 0,
            dataInicial: "",
            dataFinal: "",
            status: StatusEnum.CALCULADO,
            // Resultado do investimento
            evolucao: [
                {
                    dtReferencia: "",           // 2014-09-01
                    valIndice: 0,          // 1.0227221543640934
                    valSaldoBruto: 0,           // 25255.68
                }
            ],
            percIOF: 0,
            percImpostoRenda: 0,
            rentabilidadeBruta: 0,
            rentabilidadeLiquida: 0,
            valIOF: 0,
            valImpostoRenda: 0,
            valSaldoBruto: 0,
            valSaldoLiquido: 0
        },
    ],
    indexadores: [],
    evolucao: [],
};

export default function reduce(state = initialState, action = {}) {
    let newArray = []
    let newInvestimentosList = []
    switch (action.type) {
        case types.RECEBER_INVESTIMENTOS:
            // console.log("case types.RECEBER_INVESTIMENTOS: " + JSON.stringify(action));
            // console.log("reducer.reduce case types.RECEBER_INVESTIMENTOS");
            return {
                ...state,
                investimentosList: action.investimentosList,
            };
        case types.RECEBER_INDEXADORES:
            // console.log("case types.RECEBER_INDEXADORES state antes: " + JSON.stringify(state.investimentosList))
            // console.log("case types.RECEBER_INDEXADORES: action " + JSON.stringify(action));
            return {
                ...state,
                indexadores: action.indexadores,
            };
        case types.INCLUIR_INVESTIMENTO:
            // console.log("case types.INCLUIR_INVESTIMENTO state antes: " + JSON.stringify(state.investimentosList))
            // console.log("case types.INCLUIR_INVESTIMENTO action: " + JSON.stringify(action));
            // console.log("reducer.reduce case types.INCLUIR_INVESTIMENTO");
            // console.log("investimentos.reducer.INCLUIR_INVESTIMENTO  investimento: " + action.investimento.id + " - status: " + action.investimento.status );
            newInvestimentosList = state.investimentosList;
            newInvestimentosList.push(action.investimento);
            // console.log("case types.INCLUIR_INVESTIMENTO newInvestimentosList: " + JSON.stringify(newInvestimentosList))
            // state.set({investimentosList: []});
            return {
                ...state,
                investimentosList: newInvestimentosList,
            };
        case types.ATUALIZAR_INVESTIMENTO:
            // console.log("case types.ATUALIZAR_INVESTIMENTO state antes: " + JSON.stringify(state.investimentosList))
            // console.log("case types.ATUALIZAR_INVESTIMENTO: action " + JSON.stringify(action));
            // console.log("investimentos.reducer.ATUALIZAR_INVESTIMENTO  investimento: " + action.investimento.id + " - status: " + action.investimento.status );
            newInvestimentosList = state.investimentosList;
            let index = newInvestimentosList.findIndex(e => e.id === action.investimento.id);
            // console.log("case types.ATUALIZAR_INVESTIMENTO investimentoAtualizar: " + JSON.stringify(newInvestimentosList[index]))
            newInvestimentosList[index] = _.merge({}, newInvestimentosList[index], action.investimento);
            // console.log("case types.ATUALIZAR_INVESTIMENTO newInvestimentosList 1: " + JSON.stringify(newInvestimentosList))
            return {
                ...state,
                investimentosList: newInvestimentosList
            };
        case types.EXCLUIR_INVESTIMENTO:
            //console.log("case types.EXCLUIR_INVESTIMENTO: " + JSON.stringify(action));
            // console.log("reducer.reduce case types.EXCLUIR_INVESTIMENTO");
            // console.log("case types.EXCLUIR_INVESTIMENTO: " + JSON.stringify(action.investimento));
            newInvestimentosList = state.investimentosList
            // console.log("case types.EXCLUIR_INVESTIMENTO: newInvestimentosList 0: " + JSON.stringify(newInvestimentosList));
            // console.log("case types.EXCLUIR_INVESTIMENTO newInvestimentosList: " + JSON.stringify(newInvestimentosList));
            // console.log("case types.EXCLUIR_INVESTIMENTO indexof: " + newInvestimentosList.findIndex(e => e.id === action.investimento.id) + " - " + action.investimento.id);
            newInvestimentosList.splice(newInvestimentosList.findIndex(e => e.id === action.investimento.id), 1)
            // console.log("newInvestimentosList: " + JSON.stringify(newInvestimentosList));
            return {
                ...state,
                investimentosList: newInvestimentosList
            };
        case types.ATUALIZAR_EVOLUCAO:
            // console.log("case types.ATUALIZAR_EVOLUCAO: " + JSON.stringify(action.evolucao));
            // console.log("reducer.reduce case types.ATUALIZAR_EVOLUCAO");
            return {
                ...state,
                evolucao: action.evolucao
            };
        default:
            // console.log("case default: " + JSON.stringify(action));
            return state;
    }
}


// selectors

export function getInvestimentos(state) {
    // console.log("investimentos.reducer.getInvestimentos")
    return state.investimentosList;
}