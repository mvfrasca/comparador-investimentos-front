import { URL_API } from "../constants/base";

export default function calcularInvestimento(tipoInvestimento, valor, indexador, taxa, dataInicial, dataFinal){
    return fetch(
        `${URL_API}/investimento?tipoInvestimento=${tipoInvestimento}&valor=${valor}&indexador=${indexador}&taxa=${taxa}&dataInicial=${dataInicial}&dataFinal=${dataFinal}`)
        .then(resultado => resultado.json());
}

export function getIndexadores(){
    return fetch(
        `${URL_API}/indexadores/all`)
        .then(resultado => resultado.json());
}