import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { userDisconnecting } from '../../stores/users/actions/user.actions';

@Component({
  selector: 'app-button-logout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-logout.component.html',
  styleUrl: './button-logout.component.scss',
})
export class ButtonLogoutComponent {
  private readonly store = inject(Store);

  logout(): void {
    this.store.dispatch(userDisconnecting());
  }
}
