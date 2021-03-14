import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { httpFactory } from "@angular/http/src/http_module";
import { Observable } from "rxjs";
import { API_CONFIG } from "../config/config.api";
import { CidadeDTO } from "../models/cidades.dto";
import { EstadoDTO } from "../models/estado.dto";

@Injectable()
export class ConsultaIbgeService{

    orderBy : string = 'nome';
    states : EstadoDTO[];

    constructor( public http: HttpClient){}
    // https://servicodados.ibge.gov.br/api/v1/localidades/estados/33/municipios


    findStates() : Observable<EstadoDTO[]>{
       return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrlIbgeEstados}?orderBy=${this.orderBy}`);
    }

    findCities( uf : string ) : Observable<CidadeDTO[]>{
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrlIbgeMunicipios}/${uf}/municipios`);
    }

}