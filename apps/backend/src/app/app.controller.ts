import { Controller, Param, Sse, MessageEvent } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { fromEvent, map, Observable } from 'rxjs';

import { Notification } from './interfaces/notification.interface';

@Controller('notifications/:userId')
export class AppController {
  constructor(private readonly event: EventEmitter2) {
  }

  @Sse('/sse')
  getStreamNotifications(@Param('userId') userId: string): Observable<MessageEvent> {
    return fromEvent(this.event, `notification.push.${userId}`)
      .pipe(map((data: Notification) => ({data, id: data.id}) as MessageEvent));
  }
}
