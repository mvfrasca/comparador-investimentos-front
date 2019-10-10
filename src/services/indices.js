import { URL_API } from "../constants/base";

class IndicesService {

    async consultarIndices(dataInicial, dataFinal){
        // console.log("IndicesService.consultarIndices");
        return fetch(
            `${URL_API}/indexadores/selic/indices?dataInicial=${dataInicial}&dataFinal=${dataFinal}`)
            .then(resultado => resultado.json().then(dados => dados.body.indices));
    }

}

export default new IndicesService();