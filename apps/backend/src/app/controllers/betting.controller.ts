import { Controller, Get, Param, Post, Sse } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { AppService } from '../app.service';

@Controller('bettings')
export class BettingController {
  private readonly bettingList = [
    {
      id: uuidv4(),
      title: 'Betting PSG / Marseille',
      createdDate: new Date(),
      description: 'Betting description A',
      amount: 10,
    },
    {
      id: uuidv4(),
      title: 'Betting TFC / Bordeaux',
      createdDate: new Date(),
      description: 'Betting description B',
      amount: 50,
    }
  ];

  constructor(private readonly appService: AppService, private readonly event: EventEmitter2) {
  }

  @Get('/list')
  getBettings() {
    return this.bettingList;
  }

  @Post('/:userId/create/:betId')
  postBettings(@Param('userId') userId: string, @Param('betId') betId: string): Observable<void> {
    const bet = this.bettingList.find((bet) => bet.id === betId);
    const user = this.appService.getUser(userId);
    user.wallet -= bet.amount;
    this.event.emit(`notification.push.${userId}`, {
      data: {
        id: uuidv4(),
        content: `${user.fullname} a créé un pari sur ${bet.title} de ${bet.amount}€`,
        type: 'infos',
        createdDate: new Date(),
        user: user.fullname
      }
    });
    this.event.emit(`wallet.update.${userId}`, {
      data: {
        wallet: user.wallet,
      }
    });
    return;

  }
}
