import _ from 'lodash';
// import Immutable from 'seamless-immutable';
import * as types from '../../constants/actionTypes';
import investimentoService from "../../services/investimento";
import { StatusEnum } from  '../../constants/base';
import uuid from 'uuid/v4';
import Investimento from '../../components/Investimento/Investimento';

// export function calcularInvestimento(investimentoCalcular) {
//     // console.log("investimentos.actions.calcularInvestimento  investimentoCalcular: " + JSON.stringify(investimentoCalcular));
//     return async (dispatch, getState) => {
//         try {
//             if (investimentoCalcular.status === StatusEnum.A_CALCULAR) {
//                 // console.log("investimentos.actions.calcularInvestimento(" + id + ")");
//                 // console.log("investimentos.actions.calcularInvestimento  investimentoCalcular: " + JSON.stringify(investimentoCalcular));
//                 // console.log("investimentos.actions.calcularInvestimento");
//                 investimentoCalcular = _.assign({}, investimentoCalcular, {status: StatusEnum.CALCULANDO});
//                 dispatch({ type: types.ATUALIZAR_INVESTIMENTO, investimento: investimentoCalcular });
//                 let investimentoStore = getState().investimentos.investimentosList.find(e => e.id === investimentoCalcular.id);
//                 let investimentoCalculado = await investimentoService.calcularInvestimento(investimentoCalcular);
//                 investimentoCalculado.status = StatusEnum.CALCULADO;
//                 investimentoCalculado = _.assign({}, investimentoStore, investimentoCalculado)
//                 // console.log("investimentos.actions.calcularInvestimento investimento: " + JSON.stringify(investimento))
//                 // console.log("investimentos.actions.calcularInvestimento investimentosList[id]: " + JSON.stringify(newInvestimentosList))
//                 dispatch({ type: types.ATUALIZAR_INVESTIMENTO, investimento: investimentoCalculado });
//                 let evolucoes = atualizarEvolucoes(getState);
//                 dispatch({ type: types.ATUALIZAR_EVOLUCAO, evolucao: evolucoes });
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     };
// }

export function calcularInvestimento(investimentoCalcular) {
    // console.log("investimentos.actions.calcularInvestimento  investimentoCalcular: " + investimentoCalcular.id + " - status: " + investimentoCalcular.status );
    return async (dispatch, getState) => {
        try {
            investimentoCalcular.status = StatusEnum.CALCULANDO;
            dispatch({ type: types.ATUALIZAR_INVESTIMENTO, investimento: investimentoCalcular });
            // console.log("investimentos.actions.calcularInvestimento  investimentoCalculando [2] : " + investimentoCalcular.id + " - status: " + investimentoCalcular.status );
            investimentoService.calcularInvestimento(investimentoCalcular).then(investimentoCalculado => {
                investimentoCalculado.status = StatusEnum.CALCULADO;
                investimentoCalculado = _.assign({}, investimentoCalcular, investimentoCalculado)
                // console.log("investimentos.actions.calcularInvestimento  investimentoCalculado: " + JSON.stringify(investimentoCalculado) );
                // console.log("investimentos.actions.calcularInvestimento investimento: " + JSON.stringify(investimento))
                // console.log("investimentos.actions.calcularInvestimento investimentosList[id]: " + JSON.stringify(newInvestimentosList))
                dispatch({ type: types.ATUALIZAR_INVESTIMENTO, investimento: investimentoCalculado });
                let evolucoes = atualizarEvolucoes(getState);
                dispatch({ type: types.ATUALIZAR_EVOLUCAO, evolucao: evolucoes });
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export function atualizarEvolucoes(getState) {
    try {
        let evolucoes = [];
        getState().investimentos.investimentosList.map( 
            investimento => {
                if (investimento.evolucao === undefined) return;
                let evolucao = [[{ type: 'date', label: 'Data' }, investimento.tipoInvestimento.toUpperCase() + ' - ' + investimento.indexador ]];
                investimento.evolucao.map(
                    atualizacao => {
                        evolucao.push([new Date(atualizacao.dtReferencia), atualizacao.valIndice]);
                    }
                )
                evolucoes = _.union(evolucoes, evolucao);
            }
        )
        // console.log("evolucoes: " + JSON.stringify(evolucoes));
        evolucoes = _.flatMapDepth(_.groupBy(evolucoes, item => item[0]), pivotar);
        // console.log("evolucoes flatMap:" + JSON.stringify(evolucoes));
        return evolucoes;
    } catch (error) {
        console.error(error);
    }
}

function pivotar(item){
    let result = [item[0][0]];
    item.map( 
        subItem => {
            result.push(subItem[1]);
        }
    )
    return [result];
}

export function atualizarEvolucao() {
    return async (dispatch, getState) => {
        try {
            let evolucoes = atualizarEvolucoes();
            dispatch({ type: types.ATUALIZAR_EVOLUCAO, evolucao: evolucoes });
        } catch (error) {
            console.error(error);
        }
    }
}

export function incluirInvestimento(investimento) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: types.INCLUIR_INVESTIMENTO, investimento: investimento });
        } catch (error) {
            console.error(error);
        }
    }
}

export function atualizarInvestimento(investimentoAtualizar) {
    return async (dispatch, getState) => {
        try {
            // console.log("actions atualizarInvestimento: " + JSON.stringify(investimentoAtualizar));
            // console.log("actions atualizarInvestimento");
            // let investimentoStore = getState().investimentos.investimentosList.findIndex(e => e.id === investimentoAtualizar.id);
            investimentoAtualizar.status = StatusEnum.CALCULANDO;
            dispatch({ type: types.ATUALIZAR_INVESTIMENTO, investimento: investimentoAtualizar });
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

export function excluirInvestimento(investimento) {
    return async (dispatch, getState) => {
        try {
            // console.log("actions excluirInvestimento: " + JSON.stringify(investimento));
            // console.log("actions excluirInvestimento");
            dispatch({ type: types.EXCLUIR_INVESTIMENTO, investimento });
            
        } catch (error) {
            console.error(error);
        }
    };
}

export function consultarInvestimentos() {
    return async (dispatch, getState) => {
        try {
            // console.log("investimentos.actions.consultarInvestimentos()");
            const investimentosList = [
                {
                    id: uuid(),
                    tipoInvestimento: "poupanca",
                    tipoRendimento: "pos",
                    valInvestimentoInicial: 1000,
                    indexador: "poupanca",
                    taxa: 100,
                    taxaPrefixada: 0,
                    dataInicial: "2018-01-01",
                    dataFinal: "2018-12-31",
                    status: StatusEnum.A_CALCULAR
                },
                {
                    id: uuid(),
                    tipoInvestimento: "",
                    tipoRendimento: "",
                    valInvestimentoInicial: 1000,
                    indexador: "",
                    taxa: 100,
                    taxaPrefixada: 0,
                    dataInicial: "2018-01-01",
                    dataFinal: "2018-12-31",
                    status: StatusEnum.A_INCLUIR
                }
            ];
            // console.log("investimentos.actions.consultarInvestimentos() :" + JSON.stringify(investimentosList));
            dispatch({ type: types.RECEBER_INVESTIMENTOS, investimentosList });

            investimentosList.map( 
                (investimento) => {
                    if (investimento.status === StatusEnum.A_CALCULAR) {
                        dispatch(calcularInvestimento(investimento));
                    }
                }
            )
            
        } catch (error) {
            console.error(error);
        }
    };
}

export function consultarIndexadores() {
    return async (dispatch, getState) => {
        try {
            // console.log("investimentos.actions.consultarIndexadores");
            let indexadores = await investimentoService.getIndexadores();
            indexadores = _.filter(indexadores, {"periodicidade": "Diário"})
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