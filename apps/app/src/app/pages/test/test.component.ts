import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import * as BettingActions from '../../stores/bettings/actions/bettings.actions';
import { selectAllBettings } from '../../stores/bettings/selectors/bettings.selectors';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, NgxMaskDirective],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
}
