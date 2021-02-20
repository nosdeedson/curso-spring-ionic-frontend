import { JwtHelper } from 'angular2-jwt';
import { StorageService } from './storage.service';
import { LocalUser } from './../models/local.user';
import { API_CONFIG } from './../config/config.api';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService{

    private jwtHelper: JwtHelper = new JwtHelper();

    constructor( public http : HttpClient,
        public storage : StorageService){    }

    authenticate( credenciais : CredenciaisDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`, 
            credenciais, 
            { observe : 'response',
             responseType : 'text'
            }
        )
    }

    refreshToken(){
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh-token`, {},
            { observe : 'response',
             responseType : 'text'
            });
    }

    successFulLogin( authorization : string){
        let tok = authorization.substring(7);
        let user : LocalUser ={
            token : tok,
            email : this.jwtHelper.decodeToken(tok).sub
        }
        this.storage.setLocalUser(user);
    }

    logOut(){
        this.storage.setLocalUser(null);
    }

}