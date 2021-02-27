import { ClienteService } from '../../service/domain/cliente.service';
import { ClienteDTO } from './../../models/clientes.dto';
import { StorageService } from './../../service/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/config.api';


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
            this.clienteDTO = response as ClienteDTO;
            this.getImageIfExist()
          }, error => {
            if ( error.status == 403){
              this.handleErro('HomePage')
            } else if( error.status == 500){
              this.handleErro('CategoriasPage')
            } else{
              this.handleErro('HomePage')
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

  private handleErro( destino: string){
    this.navCtrl.setRoot(destino);
  }

}
