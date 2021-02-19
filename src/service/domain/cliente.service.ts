import { StorageService } from '../storage.service';
import { API_CONFIG } from '../../config/config.api';
import { ClienteDTO } from '../../models/clientes.dto';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ClienteService{

    constructor( public http : HttpClient,
        public storage: StorageService){}

    findClienteByEmail (email: string) : Observable<ClienteDTO>{
       return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?email=${email}`);
    }

    getImageFromBucket( id : string) : Observable<any>{
        let url = `${API_CONFIG.baseBucketUrl}/cp${id}.jpg`;
        return this.http.get(url, {responseType: 'blob'})
    }

}