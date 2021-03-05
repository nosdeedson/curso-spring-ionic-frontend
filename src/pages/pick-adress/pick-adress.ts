import { CartService } from './../../service/domain/cart.service';
import { PedidoDTO } from './../../models/pedido.dto';
import { ClienteDTO } from './../../models/clientes.dto';
import { ClienteService } from './../../service/domain/cliente.service';
import { StorageService } from './../../service/storage.service';
import { EnderecoService } from './../../service/domain/endereco.service';
import { EnderecoDto } from './../../models/endereco.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-pick-adress',
  templateUrl: 'pick-adress.html',
})
export class PickAdressPage {

  enderecos: EnderecoDto[];
  usuario : ClienteDTO;
  pedido : PedidoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage : StorageService,
    public cliente : ClienteService,
    public endServico: EnderecoService,
    public cartService : CartService) {
  }

  ionViewDidLoad() {
    let user = this.storage.getLocalUser();
    if ( user != null && user.email != null){
      this.cliente.findClienteByEmail(user.email)
        .subscribe( response => {
          this.usuario = response as ClienteDTO;
          if ( this.usuario != null ){
           this.enderecos = this.usuario['enderecos'];
           let cart = this.cartService.getCart();
            this.pedido = {
              clienteId: this.usuario.id,
              enderecoEntregaId: null,
              numeroParcelas: null,
              itens: cart.items.map(item => { return { quantidade: item.quantidade, produtoId: item.produtoDto.id } }),
              tipoPagamento: null
            }
          }
        }, error => {})
    }
  }

  nextPage(enderecoEntrega : EnderecoDto){
    this.pedido.enderecoEntregaId = enderecoEntrega.id;
    this.navCtrl.setRoot('PaymentPage', {pedido : this.pedido});
  }
}
