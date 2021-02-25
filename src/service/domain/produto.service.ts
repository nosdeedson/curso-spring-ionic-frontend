
import { API_CONFIG } from './../../config/config.api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProdutoDTO } from './../../models/produtodto';

@Injectable()
export class ProdutoService{

    itens: ProdutoDTO[]

    constructor( public http: HttpClient){ }

    findByCategoria( categoria_id : string) : Observable<ProdutoDTO[]>{
        return this.http.get<ProdutoDTO[]>(`${API_CONFIG.baseUrl}/produtos/nome-categorias?categoriasId=${categoria_id}`)
    }

    findSmallImageFromBucket(id : string){
        let url = `${API_CONFIG.baseBucketUrl}/prod${id}-small.jpg`;
        return this.http.get(url, {responseType: 'blob'});
    }

    findImageFromBucket( produtoId : string){
        let url = `${API_CONFIG.baseBucketUrl}/prod${produtoId}.jpg`;
        return this.http.get(url, {responseType : 'blob'});
    }

    findProduto( produtoId : string){
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produtoId}`);
    }
}

