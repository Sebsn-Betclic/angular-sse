import { inject, Injectable, NgZone } from '@angular/core';
import { Observable, of, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';

import { Notification } from '../types/notification.interface';
import { NotificationType } from '../types/notification.enum';
import { User } from '../types/user.interface';
import { Betting } from '../types/betting.interface';

@Injectable({ providedIn: 'root' })
export class BettingService {
  private readonly http = inject(HttpClient);

  fetchBetting(): Observable<Betting[]> {
    return this.http.get<Betting[]>('http://localhost:3000/api/bettings/list');
  }

  createBet(userId: number, betId: string): Observable<void> {
    return this.http.post<void>(`http://localhost:3000/api/bettings/${userId}/create/${betId}`, null);
  }
}
