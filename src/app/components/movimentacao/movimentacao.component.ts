import { AfterViewInit, Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';

import { Unidade, Produto, Movimentacao, MOCK_PRODUTOS } from '../../data';

@Component({
  selector: 'app-movimentacao',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './movimentacao.component.html',
  styleUrls: ['./movimentacao.component.scss'],
})
export class MovimentacaoComponent implements AfterViewInit {
  produtos = signal<Produto[]>(MOCK_PRODUTOS);

  movimentacoes = signal<Movimentacao[]>([
    {
      id: crypto.randomUUID(),
      codigoProduto: 101,
      descricaoProduto: "Caneta Azul",
      data: new Date('2023-11-20T10:00:00'),
      qtde: 100,
      tipo: 'Entrada',
      descricaoUsuario: 'Estoque Inicial'
    },
    {
      id: crypto.randomUUID(),
      codigoProduto: 102,
      descricaoProduto: "Caderno Universitário",
      data: new Date('2023-11-21T14:30:00'),
      qtde: 50,
      tipo: 'Entrada',
      descricaoUsuario: 'Compra de Fornecedor A'
    },
    {
      id: crypto.randomUUID(),
      codigoProduto: 101,
      descricaoProduto: "Caneta Azul",
      data: new Date('2023-11-22T09:15:00'),
      qtde: -12,
      tipo: 'Saída',
      descricaoUsuario: 'Venda Balcão - NF 502'
    },
    {
      id: crypto.randomUUID(),
      codigoProduto: 104,
      descricaoProduto: "Lápis Preto HB",
      data: new Date('2023-11-23T11:00:00'),
      qtde: 200,
      tipo: 'Entrada',
      descricaoUsuario: 'Reposição Estoque'
    },
    {
      id: crypto.randomUUID(),
      codigoProduto: 104,
      descricaoProduto: "Lápis Preto HB",
      data: new Date('2023-11-23T16:45:00'),
      qtde: -24,
      tipo: 'Saída',
      descricaoUsuario: 'Saída para setor administrativo'
    }
  ]);

  unidadesDisponiveis = signal<Unidade[]>([]);

  private fb = inject(FormBuilder);

  // forms
  estoqueForm = this.fb.group({
    produto: [null, Validators.required],
    qtdeRaw: [null, [Validators.required, Validators.min(1)]],
    unidadeSelecionada: [null, Validators.required],
    tipoOperacao: ['entrada', Validators.required],
    data: [new Date(), Validators.required],
    descricao: ['', Validators.required],
  });

  // UI state
  filtro = signal('');
  page = signal(0);
  pageSize = 5;
  notification = signal<string | null>(null);

  colunasEstoque: string[] = [
    'id',
    'data',
    'descricaoProduto',
    'descricaoUsuario',
    'qtde',
    'acoes',
  ];

  constructor() {
    effect(() => {
      // react to movimentacoes changes if needed
      // keep page in sync when list changes
      this.page.set(0);
    });
  }

  ngAfterViewInit() {}

  onProdutoChange() {
    const produto = this.estoqueForm.get('produto')?.value as Produto | null | undefined;
    if (!produto) return;

    this.unidadesDisponiveis.set(produto.unidade);
    if (produto.unidade.length > 0) {
      this.estoqueForm.get('unidadeSelecionada')?.setValue(produto.unidade[0] as any);
    }
  }

  lancarMovimentacao() {
    if (this.estoqueForm.invalid) return;

    const formVal = this.estoqueForm.value as {
      produto: Produto | null;
      qtdeRaw: number | null;
      unidadeSelecionada: Unidade | null;
      tipoOperacao: string | null;
      data: Date | null;
      descricao: string | null;
    };

    const produto = formVal.produto ?? null;
    const unidade = formVal.unidadeSelecionada ?? null;

    if (!produto) {
      this.notification.set('Selecione um produto antes de enviar.');
      setTimeout(() => this.notification.set(null), 2500);
      return;
    }

    if (!unidade) {
      this.notification.set('Selecione a unidade antes de enviar.');
      setTimeout(() => this.notification.set(null), 2500);
      return;
    }

    const qtdeRaw = Number(formVal.qtdeRaw ?? 0);
    if (!Number.isFinite(qtdeRaw) || qtdeRaw <= 0) {
      this.notification.set('Quantidade inválida — informe um número positivo.');
      setTimeout(() => this.notification.set(null), 2500);
      return;
    }
    let quantidadeReal = qtdeRaw * unidade.fator;
    if (formVal.tipoOperacao === 'saida') quantidadeReal = quantidadeReal * -1;

    const dataValue = formVal.data ? (formVal.data instanceof Date ? formVal.data : new Date(String(formVal.data))) : new Date();

    const novaMovimentacao: Movimentacao = {
      id: crypto.randomUUID(),
      codigoProduto: produto.codigoProduto,
      descricaoProduto: produto.descricaoProduto,
      data: dataValue,
      qtde: quantidadeReal,
      tipo: formVal.tipoOperacao === 'entrada' ? 'Entrada' : 'Saída',
      descricaoUsuario: formVal.descricao || '',
    };

    this.movimentacoes.update((lista) => [novaMovimentacao, ...lista]);
    this.notification.set('Movimentação registrada com sucesso!');
    setTimeout(() => this.notification.set(null), 3000);

    this.estoqueForm.reset({ data: new Date(), tipoOperacao: 'entrada' });
    Object.keys(this.estoqueForm.controls).forEach((key) =>
      this.estoqueForm.get(key as any)?.setErrors(null)
    );
  }

  estornarMovimentacao(mov: Movimentacao) {
    if (mov.tipo === 'Estorno') {
      this.notification.set('Não é possível estornar um estorno.');
      setTimeout(() => this.notification.set(null), 3000);
      return;
    }

    if (mov.estornado) {
      this.notification.set('Este lançamento já foi estornado.');
      setTimeout(() => this.notification.set(null), 3000);
      return;
    }

    const estorno: Movimentacao = {
      id: crypto.randomUUID(),
      codigoProduto: mov.codigoProduto,
      descricaoProduto: mov.descricaoProduto,
      data: new Date(),
      qtde: mov.qtde * -1,
      tipo: 'Estorno',
      descricaoUsuario: `ESTORNO DO LANÇAMENTO ID: ${mov.id.slice(0, 8)}...`,
      estornadoDe: mov.id
    };

    this.movimentacoes.update(lista => {
      const updated = lista.map(item => item.id === mov.id ? ({ ...item, estornado: true }) : item);
      return [estorno, ...updated];
    });
    this.notification.set('Movimentação estornada com sucesso.');
    setTimeout(() => this.notification.set(null), 3000);
  }

  aplicarFiltro(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.filtro.set(value.trim().toLowerCase());
    this.page.set(0);
  }

  displayed = computed(() => {
    const raw = this.movimentacoes();
    const q = this.filtro().trim().toLowerCase();
    const filtered = q
      ? raw.filter(
          (r) =>
            String(r.codigoProduto).includes(q) ||
            r.descricaoProduto.toLowerCase().includes(q) ||
            r.descricaoUsuario.toLowerCase().includes(q) ||
            r.tipo.toLowerCase().includes(q)
        )
      : raw;

    const start = this.page() * this.pageSize;
    return filtered.slice(start, start + this.pageSize);
  });

  totalPages() {
    const raw = this.movimentacoes();
    const q = this.filtro().trim().toLowerCase();
    const filtered = q
      ? raw.filter(
          (r) =>
            String(r.codigoProduto).includes(q) ||
            r.descricaoProduto.toLowerCase().includes(q) ||
            r.descricaoUsuario.toLowerCase().includes(q) ||
            r.tipo.toLowerCase().includes(q)
        )
      : raw;
    return Math.max(1, Math.ceil(filtered.length / this.pageSize));
  }

  nextPage() {
    if (this.page() + 1 < this.totalPages()) this.page.set(this.page() + 1);
  }
  prevPage() {
    if (this.page() > 0) this.page.set(this.page() - 1);
  }
}
