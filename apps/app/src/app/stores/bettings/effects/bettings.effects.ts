import { inject } from '@angular/core';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { switchMap, catchError, of, map, tap, filter } from 'rxjs';

import * as BettingsActions from '../actions/bettings.actions';
import * as UsersActions from '../../users/actions/user.actions';
import { BettingService } from '../../../data/betting.service';
import { appInitialized } from '../../notifications/actions/notifications.actions';
import { Store } from '@ngrx/store';
import { selectCurrentUserId } from '../../users/selectors/user.selectors';

export const userConnectedFromSession = createEffect(
  (actions$ = inject(Actions)
  ) =>
    actions$.pipe(
      ofType(appInitialized),
      filter(({ userAlreadyConnected }) => !!userAlreadyConnected),
      map(() => BettingsActions.initBettings())
    ),
  { functional: true }
);

export const fetchBettingsAfterUserConnected$ = createEffect(
  (actions$ = inject(Actions)
  ) =>
    actions$.pipe(
      ofType(UsersActions.userConnected),
      map(() => BettingsActions.initBettings())
    ),
  {
    functional: true
  }
);


export const fetchBettings$ = createEffect(
  (actions$ = inject(Actions), bettingService = inject(BettingService)
  ) =>
    actions$.pipe(
      ofType(BettingsActions.initBettings),
      switchMap(() =>
        bettingService.fetchBetting().pipe(
          tap((val) => console.log(val)),
          map((bettings) => BettingsActions.loadBettingsSuccess({ bettings })),
          catchError((error) => {
            console.error('Error', error);
            return of(BettingsActions.loadBettingsFailure({ error }));
          })
        )
      )
    ),
  {
    functional: true
  }
);

export const createBet$ = createEffect(
  (actions$ = inject(Actions), bettingService = inject(BettingService), store = inject(Store)) =>
    actions$.pipe(
      ofType(BettingsActions.createBet),
      concatLatestFrom(() => store.select(selectCurrentUserId)),
      switchMap(([{ betId }, userId]: [{betId: string}, number]) =>
        bettingService.createBet(userId, betId).pipe(
          map(() => BettingsActions.createBetSuccess()),
          catchError((error) => of(BettingsActions.createBetFailure({ error })))
        )
      )
    ),
  {
    functional: true,
  }
);
