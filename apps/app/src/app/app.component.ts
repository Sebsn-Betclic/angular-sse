import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotificationComponent } from './core/notification/notification.component';
import { Store } from '@ngrx/store';
import { appInitialized } from './stores/notifications/actions/notifications.actions';

@Component({
  standalone: true,
  imports: [RouterModule, NotificationComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly store = inject(Store);

  ngOnInit() {
    this.store.dispatch(appInitialized({
      userAlreadyConnected: !!sessionStorage.getItem('userConnected')
    }));
  }
}
