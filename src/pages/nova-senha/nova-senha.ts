import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteService } from '../../service/domain/cliente.service';


@IonicPage()
@Component({
  selector: 'page-nova-senha',
  templateUrl: 'nova-senha.html',
})
export class NovaSenhaPage {

  formGroup : FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder : FormBuilder,
    public alertController : AlertController,
    public clienteService : ClienteService) {
      this.formGroup = formBuilder.group({
        senha : ['', Validators[ 'required']],
        confirmeSenha : [ '', Validators['required'] ]
      })
  }

  ionViewDidLoad() {
    console.log("ok");
  }

  novaSenha(){
    let senha = this.formGroup.value.senha;
    let confirmeSenha = this.formGroup.value.confirmeSenha;
    this.verificaSenha(senha, confirmeSenha);
    this.clienteService.novaSenha(senha)
      .subscribe( resp => {
        let resposta = resp.body;
        this.success(resposta);
      }, error => {console.log(error)} )

  }

  verificaSenha( senha: string, confirmeSenha: string){
    if ( senha != confirmeSenha){
      let alert = this.alertController.create({
        title : "VALIDAÇÃO",
        message: "Valores não conferem; digite novamente.",
        buttons: [
          {
            text : "OK"
          }
        ],
        enableBackdropDismiss : false
      })
      alert.present();
      this.ionViewDidLoad();
    }
  }

  success( resposta : string){
    let alert = this.alertController.create({
      title : 'SUCESSO',
      message : resposta,
      enableBackdropDismiss: false,
      buttons:[
        {
          text: 'OK'
        }
      ]
    })
    alert.present();
    this.navCtrl.setRoot('CategoriasPage')
  }

}
