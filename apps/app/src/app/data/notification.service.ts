import { inject, Injectable, NgZone } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';

import { Notification } from '../types/notification.interface';
import { NotificationType } from '../types/notification.enum';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly zone = inject(NgZone);
  private readonly http = inject(HttpClient);
  private event!: EventSource;

  public createEventSource(userId: number): Observable<any> {
    this.event = new EventSource(`http://localhost:3000/api/notifications/${userId}/sse`);

    return new Observable((subscriber: Subscriber<Event>) => {
      this.event.onerror = (error) => this.zone.run(() => subscriber.error(error));
      this.event.onopen = () => this.zone.run(() => subscriber.next());
    });
  }

  public getNotifications(): Observable<Notification> {
    return new Observable<Notification>((subscriber: Subscriber<Notification>) => {
      this.event.onmessage = (event) => {
        subscriber.next(JSON.parse(event.data).data as Notification)
      }
    });
  }

  public createNotifications(userId: number): Observable<void> {
    const notification: Notification = {
      id: uuidv4(),
      content: 'Ceci est un message généré automatiquement',
      type: NotificationType.INFOS,
      createdDate: new Date(),
      user: 'Sebastien Näser'
    };
    return this.http.post<void>(`http://localhost:3000/api/notifications/${userId}`, notification);
  }

  public close(): void {
    if (!this.event) {
      return;
    }

    this.event.close();
  }
}
