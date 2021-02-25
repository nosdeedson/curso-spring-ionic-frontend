import { API_CONFIG } from './../../config/config.api';
import { CategoriaDTO } from './../../models/categoria.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../service/domain/categoria.service';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  bucketUrl : string = API_CONFIG.baseBucketUrl;
  items : CategoriaDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService : CategoriaService) {
  }

  ionViewDidLoad() {
    this.categoriaService.findAll()
        .subscribe( response => {
          this.items = response;
          this.getImageIfExists();
        }, erro => {});
  }

  showProdutos( categoria_id : string){
    this.navCtrl.push('ProdutosPage', {categoria_id: categoria_id});
  }

  getImageIfExists(){
    this.items.forEach( item =>{
      this.categoriaService.getImage(item.id)
        .subscribe( response => {
          item.imageUrl = `${API_CONFIG.baseBucketUrl}/cat${item.id}.jpg`;
        }, error => {})
    });
  }

}
