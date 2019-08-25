import _ from 'lodash';
import * as types from '../../constants/actionTypes';
import Immutable from 'seamless-immutable';
import { StatusEnum } from  '../../constants/base';

const initialState = Immutable({
    investimentosList: [
        {
            id: 0,
            tipoInvestimento: "",
            valInvestimentoInicial: 0,
            indexador: "",
            taxa: 0,
            dataInicial: "",
            dataFinal: "",
            status: StatusEnum.CALCULADO,
            // Resultado do investimento
            evolucao: [
                // {
                //     data: "",           // 2014-09-01
                //     indice: 0,          // 1.0227221543640934
                //     valor: 0,           // 25255.68
                // }
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
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.RECEBER_INVESTIMENTOS:
            // console.log("case types.RECEBER_INVESTIMENTOS: " + JSON.stringify(action));
            console.log("reducer.reduce case types.RECEBER_INVESTIMENTOS");
            return state.merge({
                investimentosList: action.investimentosList
            });
        case types.RECEBER_INDEXADORES:
            // console.log("case types.RECEBER_INDEXADORES: " + JSON.stringify(action));
            console.log("reducer.reduce case types.RECEBER_INDEXADORES");
            return state.merge({
                indexadores: action.indexadores
            });
        case types.ATUALIZAR_INVESTIMENTO:
            // console.log("case types.ATUALIZAR_INVESTIMENTO: " + JSON.stringify(action));
            console.log("reducer.reduce case types.ATUALIZAR_INVESTIMENTO");
            var newArray = []
            newArray[action.investimento.id] = action.investimento
            var newInvestimentosList = _.merge([], state.investimentosList, newArray)
            // console.log("newInvestimentosList: " + JSON.stringify(newInvestimentosList));
            return state.merge({
                investimentosList: newInvestimentosList
            });
        case types.ATUALIZAR_EVOLUCAO:
            console.log("case types.ATUALIZAR_EVOLUCAO: " + JSON.stringify(action.evolucao));
            console.log("reducer.reduce case types.ATUALIZAR_EVOLUCAO");
            state.set({evolucao: []});
            return state.merge({
                evolucao: action.evolucao
            });
        default:
            // console.log("case default: " + JSON.stringify(action));
            return state;
    }
}


// selectors

export function getInvestimentos(state) {
    console.log("investimentos.reducer.getInvestimentos")
    return state.investimentosList;
}