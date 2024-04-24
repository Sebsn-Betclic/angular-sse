import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { switchMap, catchError, of, map, tap, ignoreElements, filter } from 'rxjs';
import { Store } from '@ngrx/store';
import * as WalletActions from '../actions/wallet.actions';
import * as UserActions from '../../users/actions/user.actions';
import * as NotificationsActions from '../../notifications/actions/notifications.actions';
import { selectCurrentUserId } from '../../users/selectors/user.selectors';
import { WalletService } from '../../../data/wallet.service';
import { appInitialized } from '../../notifications/actions/notifications.actions';

export const initWalletAfterAppInitialized$ = createEffect((
    actions$ = inject(Actions)
  ) =>
    actions$.pipe(
      ofType(appInitialized),
      filter(({ userAlreadyConnected }) => !!userAlreadyConnected),
      map(() => WalletActions.walletEventSourceInitializing())
    ), {
    functional: true
  }
);

export const initWalletAfterAppUserConnected$ = createEffect((
    actions$ = inject(Actions)
  ) =>
    actions$.pipe(
      ofType(UserActions.userConnected),
      map(() => WalletActions.walletEventSourceInitializing())
    ), {
    functional: true
  }
);

export const initWalletsEventSource$ = createEffect((
    actions$ = inject(Actions), walletService = inject(WalletService), store = inject(Store)
  ) =>
    actions$.pipe(
      ofType(WalletActions.walletEventSourceInitializing),
      concatLatestFrom(() => store.select(selectCurrentUserId)),
      switchMap(([, userId]: [unknown, number]) =>
        walletService.createEventSource(userId).pipe(
          map(() => WalletActions.walletEventSourceInitialized()),
          catchError((error) => {
            console.error('Error', error);
            return of(WalletActions.walletEventSourceFailed({ error }));
          })
        )
      )
    ), {
    functional: true
  }
);


export const fetchWalletsEvents$ = createEffect((
    actions$ = inject(Actions), walletService = inject(WalletService)
  ) =>
    actions$.pipe(
      ofType(NotificationsActions.notificationEventSourceInitialized),
      switchMap(() =>
        walletService.getEvents().pipe(
          map((wallet: number) => WalletActions.walletReceived({ wallet }))
        ))
    ), {
    functional: true
  }
);

export const disconnectServerEvent$ = createEffect(
  (actions$ = inject(Actions), walletService = inject(WalletService)) =>
    actions$.pipe(
      ofType(UserActions.userDisconnected),
      tap(() => walletService.close()),
      ignoreElements()
    ),
  {
    functional: true,
    dispatch: false,
  }
);
