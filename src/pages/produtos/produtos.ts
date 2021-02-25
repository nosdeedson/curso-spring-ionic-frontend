import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { API_CONFIG } from './../../config/config.api';
import { ProdutoService } from './../../service/domain/produto.service';
import { ProdutoDTO } from './../../models/produtodto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the ProdutosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  itens: ProdutoDTO[];
  semProdutos : string;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService : ProdutoService,
    public alertController : AlertController) {  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id')
    this.produtoService.findByCategoria(categoria_id)
      .subscribe( response => {
        this.itens = response['content'];
        if ( this.itens.length == 0){
          this.notFindProducts();
        }
        if ( this.itens.length > 0){ 
          this.getImageIdExist();
        }
        else{
          this.semProdutos = "Não há produtos a serem exibidos!!"
        }
      }, error => {})
  }

  getImageIdExist(){
    this.itens.forEach( item => {
      this.produtoService.findSmallImageFromBucket(item.id)
        .subscribe( response => {
          item.imageUrl = `${API_CONFIG.baseBucketUrl}/prod${item.id}.jpg`;
        }, error => {})
    });
  }

  showDetail( produtoId : string){
    this.navCtrl.push('ProdutoDetailPage', {produtoId: produtoId});
  }

  notFindProducts(){
    let alert = this.alertController.create({
      title: 'Produtos',
      message: 'Esta categoria não tem produtos a serem exibidos.',
      enableBackdropDismiss: false,
      buttons:[
        {
          text: 'OK'
        }
      ]
    })
    alert.present();
    this.navCtrl.setRoot('CategoriasPage');
  }
}
