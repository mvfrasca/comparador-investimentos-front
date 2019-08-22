import _ from 'lodash';
// import Immutable from 'seamless-immutable';
import * as types from '../../constants/actionTypes';
import indicesService from "../../services/indices";

export function consultarIndices() {
    return async (dispatch, getState) => {
        try {
            console.log("indices.actions.consultarIndices");
            let indices = await indicesService.consultarIndices('2018-08-21','2019-08-21');
            let historicoIndices = [[{ type: 'date', label: 'Data' }, 'SELIC']];
            indices = indices.sort(
                function(a, b){
                    if(a.dt_referencia < b.dt_referencia) { return -1; }
                    if(a.dt_referencia > b.dt_referencia) { return 1; }
                    return 0;
                }
            )
            indices.map( 
                (indice, i) => {
                    historicoIndices.push([new Date(indice.dt_referencia), indice.val_indice])
                }
            )
            dispatch({ type: types.RECEBER_INDICES, historicoIndices });
        } catch (error) {
            console.error(error);
        }
    };
}