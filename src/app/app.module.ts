import { EnderecoService } from './../service/domain/endereco.service';
import { CartService } from './../service/domain/cart.service';
import { ProdutoService } from './../service/domain/produto.service';
import { AuthInterceptorProvider } from './../interceptors/auth-interceptor';
import { ClienteService } from '../service/domain/cliente.service';
import { StorageService } from './../service/storage.service';
import { AuthService } from './../service/auth.service';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoriaService } from '../service/domain/categoria.service';
import { ErrorInterceptorProvider } from '../interceptors/erro-interceptors';
import { ImageUtilService } from '../service/image-util.service';
import { ConsultaIbgeService } from '../service/consulta.ibge.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoriaService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    ClienteService,
    ProdutoService,
    CartService,
    EnderecoService,
    ImageUtilService,
    ConsultaIbgeService
  ]
})
export class AppModule {}
