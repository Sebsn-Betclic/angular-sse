import { Controller, Param, Sse, MessageEvent } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { fromEvent, map, Observable } from 'rxjs';

@Controller('wallets/:userId')
export class WalletController {
  constructor(private readonly event: EventEmitter2) {
  }

  @Sse('/sse')
  getStreamBetting(@Param('userId') userId: string): Observable<MessageEvent> {
    return fromEvent(this.event, `wallet.update.${userId}`)
      .pipe(map((data) => ({ data }) as MessageEvent));
  }
}
