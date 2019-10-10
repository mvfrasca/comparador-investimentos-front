import { URL_API } from "../constants/base";

class InvestimentoService {

    async calcularInvestimento(investimento){
        // console.log("investimentoService " + JSON.stringify(investimento))
        // console.log("investimentoService.calcularInvestimento");
        let urlAPI = `${URL_API}/investimento?tipoInvestimento=${investimento.tipoInvestimento}&tipoRendimento=${investimento.tipoRendimento}&valor=${investimento.valInvestimentoInicial}&dataInicial=${investimento.dataInicial}&dataFinal=${investimento.dataFinal}`
        urlAPI += investimento.indexador !== "" ? "&indexador=" + investimento.indexador : ""
        urlAPI += investimento.taxa !== "" ? "&taxa=" + investimento.taxa : ""
        urlAPI += investimento.taxaPrefixada !== "" ? "&taxaPrefixada=" + investimento.taxaPrefixada : ""
        // console.log("investimentoService.calcularInvestimento urlAPI: " + urlAPI);
        return fetch(urlAPI)
            .then(resultado => resultado.json().then(dados => dados.body.resultadoInvestimento));
    }

    async getIndexadores(){
        // console.log("investimentoService.getIndexadores");
        return fetch(
            `${URL_API}/indexadores/all`)
            .then(resultado => resultado.json().then(dados => dados.body.indexadores));
    }

}

export default new InvestimentoService();