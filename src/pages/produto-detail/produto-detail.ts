import { CartService } from './../../service/domain/cart.service';
import { API_CONFIG } from './../../config/config.api';
import { ProdutoService } from './../../service/domain/produto.service';
import { ProdutoDTO } from './../../models/produtodto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProdutoDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item : ProdutoDTO;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService : ProdutoService,
    public cart: CartService) {
  }

  ionViewDidLoad() {
    let produtoId = this.navParams.get('produtoId')
    this.produtoService.findProduto(produtoId)
      .subscribe( response => {
        this.item = response;
        this.setImageIfExist()
      }, error => {});
  }

  setImageIfExist(){
    this.produtoService.findImageFromBucket(this.item.id)
      .subscribe( response =>{
        this.item.imageUrl = `${API_CONFIG.baseBucketUrl}/prod${this.item.id}.jpg`
      }, error => {})
  }

  addToCart(produto : ProdutoDTO){
    this.cart.addProduto(produto);
    this.navCtrl.setRoot('CartPage', {produto : produto})
  }

}
