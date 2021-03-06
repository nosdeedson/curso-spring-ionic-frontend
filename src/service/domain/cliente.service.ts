import { ImageUtilService } from './../image-util.service';


import { ClienteDTO } from './../../models/clientes.dto';
import { StorageService } from '../storage.service';
import { API_CONFIG } from '../../config/config.api';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ClienteService{

    constructor( public http : HttpClient,
        public storage: StorageService,
        public image : ImageUtilService){}

    // findClienteByEmail (email: string) : Observable<ClienteDTO>{ busca tipada abaixo a busca não é tipa
    //    return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?email=${email}`);
    // }
    findClienteByEmail (email: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?email=${email}`);
    }

    findById( clienteId : string){
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/${clienteId}`);
    }

    getImageFromBucket( id : string) : Observable<any>{
        let url = `${API_CONFIG.baseBucketUrl}/cp${id}.jpg`;
        return this.http.get(url, {responseType: 'blob'})
    }

    insertCliente( obj: ClienteDTO){
        console.log(obj)
        return this.http.post(`${API_CONFIG.baseUrl}/clientes`, obj,
        {
            observe: 'response',
            responseType: 'text'
        })
    }

    uploadPicture( picture){
        let blob = this.image.dataUriToBlob(picture);
        let formData : FormData = new FormData();
        formData.set('file', blob, 'file.png');
        return this.http.post(`${API_CONFIG.baseUrl}/clientes/uploadPicture`, formData,
        {
            observe: 'response',
            responseType: 'text'
        })
    }

    novaSenha( senha : String){
        return this.http.put(`${API_CONFIG.baseUrl}/clientes/novaSenha`, senha,
        {
            observe: 'response',
            responseType : 'text'
        });
    }

}