import { ClienteService } from '../../service/domain/cliente.service';
import { ClienteDTO } from './../../models/clientes.dto';
import { LocalUser } from './../../models/local.user';
import { StorageService } from './../../service/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/config.api';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  clienteDTO : ClienteDTO = new ClienteDTO();
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage : StorageService,
    public clienteService: ClienteService) {   }

  ionViewDidLoad() {
    let user = this.storage.getLocalUser();
    if (user && user.email){
      this.clienteService.findClienteByEmail(user.email)
          .subscribe( response =>{
            this.clienteDTO.id = response.id.toString()
            this.clienteDTO.nome = response.nome
            this.clienteDTO.email= response.email
            this.getImageIfExist()
          }, error => {
            if ( error.status == 403){
              this.navCtrl.setRoot('HomePage')
            }
          });
    }else{
      this.navCtrl.setRoot('HomePage')
    }
  }

  getImageIfExist(){
    this.clienteService.getImageFromBucket(this.clienteDTO.id)
        .subscribe( response =>{
          this.clienteDTO.imageUrl = `${API_CONFIG.baseBucketUrl}/cp${this.clienteDTO.id}.jpg`
        }, erro =>{})
  }

}
