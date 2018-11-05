import _ from 'lodash';
import * as types from '../../constants/actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    investimentosList: [
        {
            id: 0,
            tipoInvestimento: "poupanca",
            valInvestimentoInicial: 25000,
            indexador: "poupanca",
            taxa: 0,
            dataInicial: "01/09/2014",
            dataFinal: "01/09/2018",
            calculado: false,
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
    ]


});

export default function reduce(state = initialState, action = {}) {
    console.log("investimentos.reducer.reduce " + state.investimentosList.tipoInvestimento)
    switch (action.type) {
        case types.RECEBER_INVESTIMENTOS, types.CALCULAR_INVESTIMENTO:
            return state.merge({
                investimentosList: action.investimentosList
            });
        default:
            return state;
    }
}

// selectors

export function getInvestimentos(state) {
    console.log("investimentos.reducer.getInvestimentos")
    return state.investimentos.investimentosList;
}