import { StorageService } from './../../service/storage.service';
import { PedidoService } from './../../service/domain/pedido.service';
import { EnderecoDto } from './../../models/endereco.dto';
import { ClienteService } from './../../service/domain/cliente.service';
import { CartService } from './../../service/domain/cart.service';
import { CartItem } from './../../models/cart.item';
import { PedidoDTO } from './../../models/pedido.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ClienteDTO } from '../../models/clientes.dto';
import { a } from '@angular/core/src/render3';

/**
 * Generated class for the OrderConfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDTO;
  items: CartItem[];
  cliente: ClienteDTO = new ClienteDTO();
  endereco: EnderecoDto;
  codigoPedido : String;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public pedidoService : PedidoService,
    public user : ClienteService,
    public alertController: AlertController,
    public storage : StorageService,
    public loadingController: LoadingController ) {
      this.pedido = this.navParams.get('pedido');
    }

  ionViewDidLoad() {
    this.items = this.cartService.getCart().items;
    this.findUser();
  }

  totalCompra(){
    return this.cartService.totalCompra();
  }

  findUser(){
    this.user.findById(this.pedido.clienteId)
      .subscribe( resp =>{
        this.cliente = resp as ClienteDTO;
        for ( let i = 0; i < this.cliente['enderecos'].length; i++ ){
          if ( this.cliente['enderecos'][i].id == this.pedido.enderecoEntregaId){
            this.endereco = this.cliente['enderecos'][i];
          }
        }
      }, erro => {})
  }

  voltar(){
    this.navCtrl.setRoot('CategoriasPage');
  }

  checkout(){
    let loader = this.presentLoading()
    this.pedidoService.insert(this.pedido)
      .subscribe( response =>{
        loader.dismiss();
        this.succsess(response.headers.get('location'), loader);
      }, error => {
        if (error.status == 403){
          this.navCtrl.setRoot('HomePage')
        }
      })
  }

  succsess(location: string, loader : any ){
    let position = location.lastIndexOf('/');
    let codigo = location.substring(position + 1, location.length);
    let alert = this.alertController.create({
      title : "SUCESSO",
      message:  'Seu pedido foi realizado com sucesso. Código: ' + codigo,
      buttons:[
        {
          text : 'OK'
        }
      ],
      enableBackdropDismiss : false
    })
    alert.present();
    this.cartService.createOrCleanCart();
    this.navCtrl.setRoot('CategoriasPage');
  }

  presentLoading() {
    const loading = this.loadingController.create({
      content: 'Aguarde...'
    });
    loading.present();
    return loading;
  }

}
