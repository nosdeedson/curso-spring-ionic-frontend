import { IonicPageModule} from 'ionic-angular/module';
import { NgModule } from '@angular/core';
import { HomePage } from './home';
import { IonicPage } from "ionic-angular";


@NgModule({
    declarations: [HomePage],
    imports: [ IonicPageModule.forChild(HomePage)]
})

export class HomeModule {}