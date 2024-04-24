import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NotificationComponent } from '../core/notification/notification.component';
import { UsernameComponent } from '../core/username/username.component';
import { ButtonLogoutComponent } from '../core/button-logout/button-logout.component';
import { WalletComponent } from '../core/wallet/wallet.component';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NotificationComponent, UsernameComponent, ButtonLogoutComponent, WalletComponent],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss',
})
export class BaseComponent {
}
