import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import * as BettingActions from '../../stores/bettings/actions/bettings.actions';
import { selectAllBettings } from '../../stores/bettings/selectors/bettings.selectors';

@Component({
  selector: 'app-betting',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './betting.component.html',
  styleUrl: './betting.component.scss'
})
export class BettingComponent {
  private readonly store = inject(Store);
  public readonly bettings$ = this.store.select(selectAllBettings);

  public createBet(betId: string): void {
    this.store.dispatch(BettingActions.createBet({ betId }));
  }
}
