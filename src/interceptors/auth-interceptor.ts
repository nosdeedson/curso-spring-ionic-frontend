
import { API_CONFIG } from './../config/config.api';
import { StorageService } from './../service/storage.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor( public storage: StorageService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let localUser = this.storage.getLocalUser()
        let n = API_CONFIG.baseUrl.length
        let toApi = req.url.substring(0, n) == API_CONFIG.baseUrl
        if ( localUser && toApi){
            let autReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)})
            return next.handle(autReq);
        }
        else{ 
            return next.handle(req);
        }

    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};