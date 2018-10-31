import { URL_API } from "./base";

export function calcularInvestimento(tipoInvestimento, valor, indexador, taxa, dataInicial, dataFinal){
    return fetch(
        `${URL_API}/investimento?tipoInvestimento=${tipoInvestimento}&valor=${valor}&indexador=${indexador}&taxa=${taxa}&dataInicial=${dataInicial}&dataFinal=${dataFinal}`)
        .then(resultado => resultado.json());
}