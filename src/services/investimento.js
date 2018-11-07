import { URL_API } from "../constants/base";

class InvestimentoService {

    async calcularInvestimento(tipoInvestimento, valInvestimentoInicial, indexador, taxa, dataInicial, dataFinal){
        console.log("tipoInvestimento: " + tipoInvestimento + ", valor: " + valInvestimentoInicial)
        return fetch(
            `${URL_API}/investimento?tipoInvestimento=${tipoInvestimento}&valor=${valInvestimentoInicial}&indexador=${indexador}&taxa=${taxa}&dataInicial=${dataInicial}&dataFinal=${dataFinal}`)
            .then(resultado => resultado.json());
    }

    async getIndexadores(){
        return fetch(
            `${URL_API}/indexadores/all`)
            .then(resultado => resultado.json());
    }

}

export default new InvestimentoService();