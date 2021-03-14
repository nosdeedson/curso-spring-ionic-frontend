import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovaSenhaPage } from './nova-senha';

@NgModule({
  declarations: [
    NovaSenhaPage,
  ],
  imports: [
    IonicPageModule.forChild(NovaSenhaPage),
  ],
})
export class NovaSenhaPageModule {}
