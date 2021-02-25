import { ProdutoDTO } from './produtodto';

export interface CartItem{
    quantidade: number;
    produtoDto: ProdutoDTO;
}