
import { StorageService } from './../service/storage.service';

import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AlertController } from 'ionic-angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor( public storage: StorageService,
        public alertController: AlertController){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .catch( (error, caught) =>{
            let errorObj = error.error;
            // if( !errorObj.status){
            //     errorObj = JSON.parse(errorObj);
            // }
            console.log("erro detectado.");
            if ( error.error == null){
                this.handleErroGeneric(error);
            }
            let state = error.status;
            console.log(error.error.message)
            switch(state){
                case 401:
                    this.handleErro("Email ou senha inválidos", 'Erro 401');
                    break;
                case 403:
                    this.storage.setLocalUser(null);
                    this.handleErro("Usuário não autorizado", 'Erro 403');
                    break;
                default:
                    this.handleErroSistema(error)      
            }
            return Observable.throw(errorObj);
            
        }) as any;
    }

    private handleErro(messagem: string, titulo: string){
        let alert = this.alertController.create({
            title: titulo,
            message: messagem,
            enableBackdropDismiss: false,
            buttons: [
                { text: 'OK'}
            ]
        });
        alert.present()
    }

    private handleErroSistema(obj: any){
        let alert = this.alertController.create({
            title: obj.error.error,
            message: obj.error.message,
            enableBackdropDismiss: false,
            buttons: [
                { text: 'OK'}
            ]
        });
        alert.present()
    }

    private handleErroGeneric(obj: any){
        let alert = this.alertController.create({
            title: "Erro ao acessar o servidor",
            message: obj.message,
            enableBackdropDismiss: false,
            buttons: [
                { text: 'OK'}
            ]
        });
        alert.present()
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};