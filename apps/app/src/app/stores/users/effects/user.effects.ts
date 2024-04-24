import { inject } from '@angular/core';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { switchMap, catchError, of, map, tap, ignoreElements, filter } from 'rxjs';
import { Router } from '@angular/router';

import * as UserActions from '../actions/user.actions';
import * as NotificationsActions from '../../notifications/actions/notifications.actions';
import { UserService } from '../../../data/user.service';
import { User } from '../../../types/user.interface';
import { appInitialized } from '../../notifications/actions/notifications.actions';
import { Store } from '@ngrx/store';
import { selectCurrentUserId } from '../selectors/user.selectors';

export const userConnectedFromSession = createEffect(
  (actions$ = inject(Actions)
  ) =>
    actions$.pipe(
      ofType(appInitialized),
      filter(({ userAlreadyConnected }) => !!userAlreadyConnected),
      map(() => NotificationsActions.notificationEventSourceInitializing())
    ),
  { functional: true }
);

export const userConnecting$ = createEffect((
    actions$ = inject(Actions), userService = inject(UserService)
  ) =>
    actions$.pipe(
      ofType(UserActions.userConnecting),
      switchMap(({ userId }) =>
        userService.getUser(userId)
          .pipe(
            map((user: User) => UserActions.userConnected({ user })))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(UserActions.userConnectingFailed({ error }));
      })
    ),
  { functional: true }
);

export const userConnected$ = createEffect((
    actions$ = inject(Actions), router = inject(Router)
  ) =>
    actions$.pipe(
      ofType(UserActions.userConnected),
      tap(({ user }) => {
          sessionStorage.setItem('userConnected', JSON.stringify(user));
          void router.navigate(['/home']);
        }
      ),
      ignoreElements()
    ),
  { functional: true, dispatch: false }
);

export const userDisconnecting$ = createEffect((
    actions$ = inject(Actions), router = inject(Router)
  ) =>
    actions$.pipe(
      ofType(UserActions.userDisconnecting),
      map(() => {
          sessionStorage.removeItem('userConnected');
          void router.navigate(['/login']);

          return UserActions.userDisconnected();
        }
      ),
      ignoreElements()
    ),
  { functional: true, dispatch: false }
);
