import { ItensDTO } from './itens.dto';

export interface PedidoDTO{
    clienteId : string;
    enderecoEntrega: string;
    numeroParcelas: number;
    tipoPagamento: string;
    itens: ItensDTO[];
}