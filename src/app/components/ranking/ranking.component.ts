import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MOCK_VENDAS, RankingVendedor } from '../../data';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent {
  vendasRaw = signal(MOCK_VENDAS);

  ranking = computed(() => {
    const vendas = this.vendasRaw();
    const mapa = new Map<string, RankingVendedor>();

    vendas.forEach((venda) => {
      let comissao = 0;
      if (venda.valor >= 500) comissao = venda.valor * 0.05;
      else if (venda.valor >= 100) comissao = venda.valor * 0.01;

      if (!mapa.has(venda.vendedor))
        mapa.set(venda.vendedor, {
          vendedor: venda.vendedor,
          totalVendas: 0,
          totalComissao: 0,
          qtdVendas: 0,
        });

      const atual = mapa.get(venda.vendedor)!;
      atual.totalVendas += venda.valor;
      atual.totalComissao += comissao;
      atual.qtdVendas += 1;
    });

    return Array.from(mapa.values()).sort((a, b) => b.totalVendas - a.totalVendas);
  });

  totalGeralVendas = computed(() => this.vendasRaw().reduce((acc, curr) => acc + curr.valor, 0));
}
