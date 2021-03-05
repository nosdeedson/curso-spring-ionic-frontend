import { API_CONFIG } from './../../config/config.api';
import { PedidoDTO } from './../../models/pedido.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class PedidoService{

    constructor( public http : HttpClient){}

    insert(pedido : PedidoDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/pedidos`, pedido,
        {
            responseType : 'text',
            observe : 'response'
        })
    }
}