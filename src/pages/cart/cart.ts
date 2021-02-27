import { ProdutoDTO } from './../../models/produtodto';
import { CartService } from './../../service/domain/cart.service';


import { CartItem } from './../../models/cart.item';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];

  total: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.items = cart.items;
    this.totalCompra();
  }

  aumentaQuantidadeProduto(produto : ProdutoDTO){
    this.cartService.aumentandoQuantidade(produto);
    this.ionViewDidLoad();
  }

  diminuiQuantidadeProduto(produto : ProdutoDTO){
    this.cartService.diminuindoQuantidade(produto);
    this.ionViewDidLoad();
  }

  deletaProdutoCarrinho(produto : ProdutoDTO){
    this.cartService.removeProduto(produto);
    this.ionViewDidLoad();
  }

  totalCompra(){
    this.total = this.cartService.totalCompra();
  }

  goOn(){
    this.navCtrl.setRoot('CategoriasPage')
  }

  checkout(){
    this.navCtrl.setRoot('PickAdressPage')
  }
}
