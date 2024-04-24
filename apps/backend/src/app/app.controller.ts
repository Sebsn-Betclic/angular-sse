import { Body, Controller, Param, Post, Sse } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { fromEvent, map, Observable } from 'rxjs';

import { MessageDto } from './interfaces/message.dto';

@Controller('notifications/:userId')
export class AppController {
  constructor(private readonly event: EventEmitter2) {
  }

  @Post()
  postMessages(@Body() data: MessageDto, @Param('userId') userId: string) {
    return this.event.emit(`notification.push.${userId}`, { data });
  }

  @Sse('/sse')
  getStreamNotifications(@Param('userId') userId: string): Observable<MessageEvent> {
    return fromEvent(this.event, `notification.push.${userId}`)
      .pipe(map((data) => ({data}) as MessageEvent));
  }
}
