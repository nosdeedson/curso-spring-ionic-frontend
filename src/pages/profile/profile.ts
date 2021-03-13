import { ClienteService } from '../../service/domain/cliente.service';
import { ClienteDTO } from './../../models/clientes.dto';
import { StorageService } from './../../service/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/config.api';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageUtilService } from '../../service/image-util.service';



@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  clienteDTO : ClienteDTO = new ClienteDTO();
  picture : string;
  cameraOn : boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage : StorageService,
    public clienteService: ClienteService,
    public camera: Camera) {   }

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

  getCameraPicture(){
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false;
    }, (err) => {console.log(err)    });
  }

  sendPicture(){
    this.clienteService.uploadPicture(this.picture)
      .subscribe( response => {
        this.picture = null;
        this.ionViewDidLoad();
      }, erro => {})
  }

  cancel(){
    this.picture = null;
  }
  

}
