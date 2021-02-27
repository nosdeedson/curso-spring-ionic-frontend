import { API_CONFIG } from './../../config/config.api';
import { Observable } from 'rxjs/Rx';
import { EnderecoDto } from './../../models/endereco.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";


@Injectable()
export class EnderecoService{

    constructor( public http : HttpClient){}

    findAll( clienteId : string) : Observable<EnderecoDto[]>{
        return this.http.get<EnderecoDto[]>(`${API_CONFIG.baseUrl}/clientes/${clienteId}/enderecos`);
    }
}