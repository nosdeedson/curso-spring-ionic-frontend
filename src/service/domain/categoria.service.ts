import { API_CONFIG } from './../../config/config.api';
import { ProdutoDTO } from './../../models/produtodto';
import { CategoriaDTO } from '../../models/categoria.dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class  CategoriaService {

    items : CategoriaDTO[];

    constructor( public http : HttpClient) {    }

    findAll() : Observable<CategoriaDTO[]>{
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias/listar`);
    }

    getImage( id : string) {
        let url = `${API_CONFIG.baseBucketUrl}/cat${id}.jpg`;
        return this.http.get(url, {responseType : 'blob'});
    }

}