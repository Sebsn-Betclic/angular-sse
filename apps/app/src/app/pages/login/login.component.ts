import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { userConnecting } from '../../stores/users/actions/user.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly store = inject(Store);

  chooseUser(userId: number): void {
    this.store.dispatch(userConnecting({ userId }));
  }
}
