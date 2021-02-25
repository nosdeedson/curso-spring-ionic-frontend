import { ProdutoDTO } from './../../models/produtodto';

import { Cart } from './../../models/cart';
import { StorageService } from './../storage.service';
import { Injectable } from "@angular/core";

@Injectable()
export class CartService{

    constructor( public storage: StorageService){}

    createOrCleanCart(): Cart{
        let cart: Cart = {items: []};
        this.storage.setCart(cart);
        return cart;
    }

    getCart() : Cart{
        let cart = this.storage.getCart();
        if ( cart == null){
            cart = this.createOrCleanCart();
        }
        return cart;        
    }

    addProduto( produto : ProdutoDTO) : Cart{
        let cart = this.getCart();
        let positon = cart.items.findIndex(x => x.produtoDto.id == produto.id)
        if ( positon == -1){
            cart.items.push({quantidade:1 , produtoDto: produto});
        } 
        this.storage.setCart(cart);
        return cart;
    }

    removeProduto( produto: ProdutoDTO){
        let cart = this.getCart();
        let position = cart.items.findIndex( prod => prod.produtoDto.id == produto.id);
        if ( position != -1){
            cart.items.splice(position, 1);
        }
        this.storage.setCart(cart);
        return cart;
    }

    aumentandoQuantidade( produto : ProdutoDTO){
        let cart = this.storage.getCart();
        cart.items.forEach( prod => {
            if ( prod.produtoDto.id == produto.id){
                prod.quantidade++;
            }
        })
        this.storage.setCart(cart);
    }

    diminuindoQuantidade( produto : ProdutoDTO){
        let cart = this.storage.getCart();
        cart.items.forEach( prod => {
            if ( prod.produtoDto.id == produto.id){
                prod.quantidade--;
                if ( prod.quantidade < 1 ){
                   cart = this.removeProduto(prod.produtoDto);
                }
            }
        })
        this.storage.setCart(cart);
    }

    totalCompra() : number{
        let cart = this.storage.getCart();
        let total = 0;
        cart.items.forEach( prod => {
            total += prod.quantidade * prod.produtoDto.preco;
        })
        return total;
    }
}