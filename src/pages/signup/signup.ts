import { ClienteService } from './../../service/domain/cliente.service';
import { EstadoService } from './../../service/domain/estado.service';
import { CidadeService } from './../../service/domain/cidade.service';
import { EstadoDTO } from './../../models/estado.dto';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CidadeDTO } from '../../models/cidades.dto';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  cidadesDTO : CidadeDTO[];
  estadosDTO: EstadoDTO[];

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public cidadeService: CidadeService,
     public estadoService: EstadoService,
     public clienteService: ClienteService,
     public alertControl: AlertController,
     public formBuilder: FormBuilder) {
       this.formGroup = this.formBuilder.group({
         nome: ['Jussara souza', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
         email: ['ju@gmail.com', [Validators.required, Validators.email]],
         CNPJ_CPF: ['67506856093', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
         tipo: ['', [Validators.required]],
         senha: ['1234', [Validators.required]],
         confirmeSenha: ['1234', [Validators.required]],
         logradouro: ['maria de lourdes', [Validators.required]],
         numero: ['163', [Validators.required]],
         complemento: ['', []],
         bairro: ['maria de lourdes', [Validators.required]],
         cep: ['37517000', [Validators.required]],
         telefone1: ['999998888', [Validators.required]],
         telefone2: ['', []],
         telefone3: ['', []],
         estadoId: [null, [Validators.required]],
         cidadeId: [null, [Validators.required]],
       })
  }

  ionViewDidLoad() {
    this.estadoService.findAll()
    .subscribe(response =>{
      this.estadosDTO = response;
      this.formGroup.controls.estadoId.setValue(this.estadosDTO[0].id);
      this.updateCidades();
    }, error => {});
  }

  signUpUser(){
    this.clienteService.insertCliente(this.formGroup.value)
      .subscribe( response =>{
        this.showInsertOk()
      }, error => {})
  }

  showInsertOk(){
    let alert = this.alertControl.create({
      title: 'SUCESSO',
      message: 'Usuaŕio criado com sucesso!',
      enableBackdropDismiss: false,
      buttons:[
        {
          text: 'OK',
          handler: () =>{
            this.navCtrl.pop();
          }
        }
      ]
    })
    alert.present();
  }

  updateCidades(){
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
      .subscribe(response =>{
        this.cidadesDTO = response;
        this.formGroup.controls.cidadeId.setValue(null);
      })

  }
}
