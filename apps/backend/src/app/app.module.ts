import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { BettingController } from './controllers/betting.controller';
import { WalletController } from './controllers/wallet.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    EventEmitterModule.forRoot()
  ],
  controllers: [AppController, BettingController, WalletController],
  providers: [AppService]
})
export class AppModule {
}
