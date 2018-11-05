import { URL_API } from "../constants/base";

export function consultarStatusAPI(){
    return fetch(`${URL_API}/indexadores/all`)
        .then(resultado => resultado.json());
}