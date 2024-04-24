import { inject } from '@angular/core';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { switchMap, catchError, of, map, tap, ignoreElements } from 'rxjs';
import { Store } from '@ngrx/store';
import * as UserActions from '../../users/actions/user.actions';
import * as NotificationsActions from '../actions/notifications.actions';
import { NotificationService } from '../../../data/notification.service';
import { Notification } from '../../../types/notification.interface';
import { selectCurrentUserId } from '../../users/selectors/user.selectors';

export const initNotificationsAfterAppInitialized$ = createEffect((
    actions$ = inject(Actions)
  ) =>
    actions$.pipe(
      ofType(UserActions.userConnected),
      map(() => NotificationsActions.notificationEventSourceInitializing())
    ), {
    functional: true
  }
);

export const initNotificationsEventSource$ = createEffect((
    actions$ = inject(Actions), notificationService = inject(NotificationService), store = inject(Store)
  ) =>
    actions$.pipe(
      ofType(NotificationsActions.notificationEventSourceInitializing),
      concatLatestFrom(() => store.select(selectCurrentUserId)),
      switchMap(([, userId]: [unknown, number]) =>
        notificationService.createEventSource(userId).pipe(
          map(() => NotificationsActions.notificationEventSourceInitialized()),
          catchError((error) => {
            console.error('Error', error);
            return of(NotificationsActions.notificationEventSourceFailed({ error }));
          })
        )
      )
    ), {
    functional: true
  }
);


export const fetchNotificationEvents$ = createEffect((
    actions$ = inject(Actions), notificationService = inject(NotificationService)
  ) =>
    actions$.pipe(
      ofType(NotificationsActions.notificationEventSourceInitialized),
      switchMap(() =>
        notificationService.getNotifications().pipe(
          map((notification: Notification) => NotificationsActions.notificationReceived({ notification }))
        ))
    ), {
    functional: true
  }
);

export const notificationGenerated$ = createEffect((
    action$ = inject(Actions), notificationService = inject(NotificationService), store = inject(Store)
  ) =>
    action$.pipe(
      ofType(NotificationsActions.notificationGenerated),
      concatLatestFrom(() => store.select(selectCurrentUserId)),
      switchMap(([, userId]: [unknown, number]) =>
        notificationService.createNotifications(userId).pipe(
          map(() => NotificationsActions.notificationGenerateSuccessfully()),
          catchError(() => of(NotificationsActions.notificationGenerateFailed()))
        )
      )
    ),
  {
    functional: true
  }
);

export const disconnectServerEvent$ = createEffect(
  (actions$ = inject(Actions), notificationService = inject(NotificationService)) =>
    actions$.pipe(
      ofType(UserActions.userDisconnected),
      tap(() => notificationService.close()),
      ignoreElements()
    ),
  {
    functional: true,
    dispatch: false,
  }
);
