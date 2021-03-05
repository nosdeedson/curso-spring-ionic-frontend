import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { API_CONFIG } from './../../config/config.api';
import { ProdutoService } from './../../service/domain/produto.service';
import { ProdutoDTO } from './../../models/produtodto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { markParentViewsForCheck } from '@angular/core/src/view/util';

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

  itens: ProdutoDTO[] = [];
  page : number = 0;
  loaded : number = 2000;
  start : number = 0;
  end : number;
  size : number = 6;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService : ProdutoService,
    public alertController : AlertController,
    public loadingController : LoadingController) {  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id')
    this.produtoService.findByCategoria(categoria_id, this.page, this.size)
      .subscribe( response => {
        this.start = this.itens.length;
        this.itens = this.itens.concat(response['content']);
        this.end = this.itens.length - 1;
        if ( this.itens.length == 0){
          this.notFindProducts();
        }
        if ( this.itens.length > 0){ 
          this.getImageIdExist(this.start, this.end);
          this.loaded = 100;
        }
        let loader = this.presentLoading();
        loader.dismiss();
      }, error => {
        let loader = this.presentLoading();
        loader.dismiss();
      })
  }

  getImageIdExist(start : number, end : number){

    for (let i = start; i < end; i++){
      this.produtoService.findSmallImageFromBucket(this.itens[i].id)
      .subscribe( response =>{
        this.itens[i].imageUrl = `${API_CONFIG.baseBucketUrl}/prod${this.itens[i].id}.jpg`
      }, erro => {})
    }
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

  presentLoading() {
    const loading = this.loadingController.create({
      content: "Aguarde ..."
    });
    loading.present();
    return loading;
  }
  
  doRefresh(event) {
    this.itens= [];
    this.page = 0;
    this.ionViewDidLoad();
    setTimeout(() => {
      event.complete();
    }, this.loaded);
  }

  loadData(event) {
    this.page++;
    this.ionViewDidLoad();
    setTimeout(() => {
      event.complete();
    }, 500);
  }
}
