import { inject, Injectable, NgZone } from '@angular/core';
import { Observable, of, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';

import { Notification } from '../types/notification.interface';
import { NotificationType } from '../types/notification.enum';
import { User } from '../types/user.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly users: Map<number, User> = new Map([
    [123456, {
      id: 123456,
      fullname: 'John Wick',
      username: 'JohnWick',
      wallet: 1000,
    }],
    [789456, {
      id: 789456,
      fullname: 'Thomas A. Anderson',
      username: 'Neo',
      wallet: 5000,
    }]
  ]);

  public getUser(userId: number): Observable<User> {
      return of(this.users.get(userId) as User);
  }
}
