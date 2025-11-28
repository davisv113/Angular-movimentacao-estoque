# Movimentação de Estoque — Angular 21 (Signals + Reactive Forms + Tailwind)

Um projeto de exemplo / desafio que demonstra boas práticas modernas do Angular 21: componentes standalone, signals (reactive primitives), reactive forms fortes em TypeScript e UI estilizada com Tailwind CSS.

Principais focos
- Angular 21 (standalone components, signals, computed/effect)
- Reactive Forms com validação e UX cuidadosa
- UI responsiva construída com Tailwind CSS (migração a partir de Angular Material)
- Componentização: Movimentação (lançamentos/estornos) e Ranking (vendas/comissões)

Arquitetura & componentes
- src/app/app.ts — root standalone component (controls tabs e exibe os componentes filhos)
- src/app/data.ts — modelos (Produto, Movimentacao, VendaRaw, etc.) e dados mock
- src/app/components/movimentacao — formulário de lançamentos, histórico e lógica de estorno
- src/app/components/ranking — ranking de vendedores, regras de comissionamento (computed signals)

Principais funcionalidades
- Lançamento de entrada/saída com unidade/fator e validação
- Histórico de movimentações com paginação e filtro
- Estorno seguro (um lançamento não pode ser estornado mais de uma vez)
- Ranking de vendedores com cálculo de comissões (regra de exemplo)

Setup — executando localmente
1. Instale dependências

```bash
npm install
```

2. Rodar em desenvolvimento (hot-reload)

```bash
npm run start
```
