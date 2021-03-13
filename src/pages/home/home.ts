import { StorageService } from './../../service/storage.service';
import { AuthService } from './../../service/auth.service';
import { CredenciaisDTO } from './../../models/credenciais.dto';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   credenciais: CredenciaisDTO = {
    email : "",
    senha : ""
  }

  constructor(public navCtrl: NavController,
     public menu: MenuController,
     public auth: AuthService,
     public storage: StorageService) { 
      this.credenciais.senha ="1234";
      this.credenciais.email="maria@gmail.com"
    }

  login() {
    this.auth.authenticate(this.credenciais)
      .subscribe( response => {
        this.auth.successFulLogin(response.headers.get('Authorization'))
        this.navCtrl.setRoot("CategoriasPage");
      }, error => {});
    
  }

  signup(){
    this.navCtrl.setRoot('SignupPage')
  }

  ionViewDidEnter() {
    let localUser = this.storage.getLocalUser();
    if (localUser) {
      this.auth.refreshToken().subscribe(response => {
        this.auth.successFulLogin(response.headers.get('Authorization'))
        this.navCtrl.setRoot('CategoriasPage')
      }, error => { });
    }
  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }
}
