import _ from 'lodash';
import * as types from '../../constants/actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    historicoIndices: [
        //     ['Data', 'SELIC', 'IPCA'],
        //     ['2014-09-01', 0.1256, 0.5689]
    ],
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.RECEBER_INDICES:
            // console.log("case types.RECEBER_INDICES: " + JSON.stringify(action));
            console.log("reducer.reduce case types.RECEBER_INDICES");
            return state.merge({
                historicoIndices: action.historicoIndices
            });
        default:
            // console.log("case default: " + JSON.stringify(action));
            return state;
    }
}

// selectors

export function getHistoricoIndices(state) {
    console.log("indices.reducer.getHistoricoIndices")
    return state.historico;
}