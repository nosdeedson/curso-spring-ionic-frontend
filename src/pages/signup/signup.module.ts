import { CidadeService } from './../../service/domain/cidade.service';
import { EstadoService } from './../../service/domain/estado.service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
  ],
  providers:[
    CidadeService,
    EstadoService,
  ]
})
export class SignupPageModule {}
