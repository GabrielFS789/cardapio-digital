export interface ICart{
    valorTotal: number;
    products: IProductCart[]
}

interface IProductCart{
    id: number;
    nome: string;
    precoVenda: number;
    imagemUrl ?: string;
    unidadeMedida?: string;
    quantidade: number;
}
