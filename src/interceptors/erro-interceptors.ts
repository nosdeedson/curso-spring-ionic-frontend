import { StorageService } from './../service/storage.service';

import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor( public storage: StorageService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("passou pelo interceptor de erro")
        return next.handle(req)
        .catch( (error, caught) =>{
            let errorObj = error.error;
            // if( !errorObj.status){
            //     errorObj = JSON.parse(errorObj);
            // }
            console.log("erro detectado.");
            switch( errorObj.status){
                case 403:
                    this.storage.setLocalUser(null);
                    break;                
            }
            return Observable.throw(errorObj);
            
        }) as any;
    }

}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};