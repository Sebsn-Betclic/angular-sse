import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEnvironmentNgxMask } from 'ngx-mask';

import * as notificationsEffects from './stores/notifications/effects/notifications.effects';
import * as bettingEffects from './stores/bettings/effects/bettings.effects';
import * as userEffects from './stores/users/effects/user.effects';
import * as walletEffects from './stores/wallets/effects/wallet.effects';

import * as fromNotifications from './stores/notifications/reducers/notifications.reducer';
import * as fromUser from './stores/users/reducers/user.reducer';
import * as fromBettings from './stores/bettings/reducers/bettings.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    provideAnimations(),
    provideStore({}),
    provideState(fromUser.USER_FEATURE_KEY, fromUser.userReducer),
    provideState(fromNotifications.NOTIFICATIONS_FEATURE_KEY, fromNotifications.notificationsReducer),
    provideState(fromBettings.BETTINGS_FEATURE_KEY, fromBettings.bettingsReducer),
    provideEffects(userEffects, notificationsEffects, bettingEffects, walletEffects),
    provideRouterStore(),
    provideStoreDevtools(),
    provideEnvironmentNgxMask(),
  ],
};
