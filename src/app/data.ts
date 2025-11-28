export interface Unidade {
  unidade: string;
  fator: number;
}

export interface Produto {
  codigoProduto: number;
  descricaoProduto: string;
  estoque: number;
  unidade: Unidade[];
}

export interface Movimentacao {
  id: string;
  codigoProduto: number;
  descricaoProduto: string;
  data: Date;
  qtde: number;
  tipo: 'Entrada' | 'Saída' | 'Estorno';
  descricaoUsuario: string;
  estornadoDe?: string;
  estornado?: boolean;
}

export interface VendaRaw {
  vendedor: string;
  valor: number;
}

export interface RankingVendedor {
  posicao?: number;
  vendedor: string;
  totalVendas: number;
  totalComissao: number;
  qtdVendas: number;
}

export const MOCK_PRODUTOS: Produto[] = [
  { codigoProduto: 101, descricaoProduto: "Caneta Azul", estoque: 150, unidade: [{ unidade: "UN", fator: 1 }, { unidade: "CX", fator: 12 }] },
  { codigoProduto: 102, descricaoProduto: "Caderno Universitário", estoque: 75, unidade: [{ unidade: "UN", fator: 1 }, { unidade: "CX", fator: 10 }] },
  { codigoProduto: 103, descricaoProduto: "Borracha Branca", estoque: 200, unidade: [{ unidade: "UN", fator: 1 }, { unidade: "DP", fator: 5 }, { unidade: "CX", fator: 20 }] },
  { codigoProduto: 104, descricaoProduto: "Lápis Preto HB", estoque: 320, unidade: [{ unidade: "UN", fator: 1 }, { unidade: "DP", fator: 6 }, { unidade: "CX", fator: 24 }] },
  { codigoProduto: 105, descricaoProduto: "Marcador de Texto Amarelo", estoque: 90, unidade: [{ unidade: "UN", fator: 1 }, { unidade: "CX", fator: 6 }] }
];

export const MOCK_VENDAS: VendaRaw[] = [
  { vendedor: "João Silva", valor: 1200.50 }, { vendedor: "João Silva", valor: 950.75 }, { vendedor: "João Silva", valor: 1800.00 },
  { vendedor: "João Silva", valor: 1400.30 }, { vendedor: "João Silva", valor: 1100.90 }, { vendedor: "João Silva", valor: 1550.00 },
  { vendedor: "João Silva", valor: 1700.80 }, { vendedor: "João Silva", valor: 250.30 }, { vendedor: "João Silva", valor: 480.75 },
  { vendedor: "João Silva", valor: 320.40 },
  { vendedor: "Maria Souza", valor: 2100.40 }, { vendedor: "Maria Souza", valor: 1350.60 }, { vendedor: "Maria Souza", valor: 950.20 },
  { vendedor: "Maria Souza", valor: 1600.75 }, { vendedor: "Maria Souza", valor: 1750.00 }, { vendedor: "Maria Souza", valor: 1450.90 },
  { vendedor: "Maria Souza", valor: 400.50 }, { vendedor: "Maria Souza", valor: 180.20 }, { vendedor: "Maria Souza", valor: 90.75 },
  { vendedor: "Carlos Oliveira", valor: 800.50 }, { vendedor: "Carlos Oliveira", valor: 1200.00 }, { vendedor: "Carlos Oliveira", valor: 1950.30 },
  { vendedor: "Carlos Oliveira", valor: 1750.80 }, { vendedor: "Carlos Oliveira", valor: 1300.60 }, { vendedor: "Carlos Oliveira", valor: 300.40 },
  { vendedor: "Carlos Oliveira", valor: 500.00 }, { vendedor: "Carlos Oliveira", valor: 125.75 },
  { vendedor: "Ana Lima", valor: 1000.00 }, { vendedor: "Ana Lima", valor: 1100.50 }, { vendedor: "Ana Lima", valor: 1250.75 },
  { vendedor: "Ana Lima", valor: 1400.20 }, { vendedor: "Ana Lima", valor: 1550.90 }, { vendedor: "Ana Lima", valor: 1650.00 },
  { vendedor: "Ana Lima", valor: 75.30 }, { vendedor: "Ana Lima", valor: 420.90 }, { vendedor: "Ana Lima", valor: 315.40 }
];
