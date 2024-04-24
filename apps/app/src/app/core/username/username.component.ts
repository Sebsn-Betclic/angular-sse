import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectTotalNotifications } from '../../stores/notifications/selectors/notifications.selectors';
import { selectCurrentUserFullName } from '../../stores/users/selectors/user.selectors';

@Component({
  selector: 'app-username',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './username.component.html',
  styleUrl: './username.component.scss',
})
export class UsernameComponent {
  private readonly store = inject(Store);
  public readonly fullNameUser$ = this.store.select(selectCurrentUserFullName);
}
