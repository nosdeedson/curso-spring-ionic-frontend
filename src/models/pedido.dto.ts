import { ItensDTO } from './itens.dto';

export interface PedidoDTO{
    clienteId : string;
    enderecoEntregaId: string;
    numeroParcelas: number;
    tipoPagamento: string;
    itens: ItensDTO[];
}