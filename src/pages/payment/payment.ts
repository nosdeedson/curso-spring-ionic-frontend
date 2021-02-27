import { PedidoDTO } from './../../models/pedido.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  formGroup: FormGroup;

  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  pedido: PedidoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formbuilder: FormBuilder) {
      this.pedido = navParams.get('pedido');
      this.formGroup = formbuilder.group({
        numeroParcelas: [1, Validators.required],
        tipoPagamento: ["pagamentoComCartao", Validators.required]
      });
  }

  ionViewDidLoad() {
    let pedido = this.navParams.get('pedido');
  }

  nextPage(){
    let pag = this.formGroup.value;
    if ( pag.numeroParcelas != null)
      this.pedido.numeroParcelas= pag.numeroParcelas;
    this.pedido.tipoPagamento= pag.tipoPagamento;
    console.log(this.pedido)
  }
}
