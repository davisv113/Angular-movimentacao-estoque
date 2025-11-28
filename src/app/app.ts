import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovimentacaoComponent } from './components/movimentacao/movimentacao.component';
import { RankingComponent } from './components/ranking/ranking.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MovimentacaoComponent, RankingComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  title = signal('movimentacao-estoque');
  currentTab = signal<'mov' | 'rank'>('mov');

  setTab(tab: 'mov' | 'rank'){
    this.currentTab.set(tab);
  }
}
