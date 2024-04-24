import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { selectWallet } from '../../stores/users/selectors/user.selectors';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss',
})
export class WalletComponent {
  private readonly store = inject(Store);
  public readonly wallet$ = this.store.select(selectWallet);
}
