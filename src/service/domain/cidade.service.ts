import { API_CONFIG } from './../../config/config.api';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { CidadeDTO } from '../../models/cidades.dto';


@Injectable()
export class CidadeService{

    constructor(public http: HttpClient){}

    findAll(estado_id: string) : Observable<CidadeDTO[]>{
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estado_id}/cidades`);
    }

}