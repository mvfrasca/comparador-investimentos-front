import { URL_API } from "../constants/base";

class InvestimentoService {

    async calcularInvestimento(investimento){
        // console.log("investimentoService " + JSON.stringify(investimento))
        console.log("investimentoService.calcularInvestimento");
        return fetch(
            `${URL_API}/investimento?tipoInvestimento=${investimento.tipoInvestimento}&valor=${investimento.valInvestimentoInicial}&indexador=${investimento.indexador}&taxa=${investimento.taxa}&dataInicial=${investimento.dataInicial}&dataFinal=${investimento.dataFinal}`)
            .then(resultado => resultado.json().then(dados => dados.body.resultadoInvestimento));
    }

    async getIndexadores(){
        console.log("investimentoService.getIndexadores");
        return fetch(
            `${URL_API}/indexadores/all`)
            .then(resultado => resultado.json().then(dados => dados.body.indexadores));
    }

}

export default new InvestimentoService();