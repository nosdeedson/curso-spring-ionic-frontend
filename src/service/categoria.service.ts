import { API_CONFIG } from './../config/config.api';
import { CategoriaDTO } from './../models/categoria.dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Page } from 'ionic-angular/navigation/nav-util';

@Injectable()
export class  CategoriaService {

    items : CategoriaDTO[];

    constructor( public http : HttpClient) {    }

    findAll() : Observable<CategoriaDTO[]>{
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias/listar`);
    }

}