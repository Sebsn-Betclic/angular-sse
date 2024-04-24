import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  selectNotifications,
  selectTotalNotifications
} from '../../stores/notifications/selectors/notifications.selectors';
import { selectCurrentUserFullName } from '../../stores/users/selectors/user.selectors';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {
  private readonly store = inject(Store);
  public readonly totalNotifications$ = this.store.select(selectTotalNotifications);
  public readonly notifications$ = this.store.select(selectNotifications);
  public isVisible = false;

  public toggleVisible(): void {
    this.isVisible = !this.isVisible;
  }
}
