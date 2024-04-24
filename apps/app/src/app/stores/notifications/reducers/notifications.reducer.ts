import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as NotificationsActions from '../actions/notifications.actions';
import { Notification } from '../../../types/notification.interface';

export const NOTIFICATIONS_FEATURE_KEY = 'notifications';

export type NotificationsState = EntityState<Notification>;

export interface NotificationsPartialState {
  readonly [NOTIFICATIONS_FEATURE_KEY]: NotificationsState;
}

export const notificationsAdapter: EntityAdapter<Notification> =
  createEntityAdapter<Notification>({
    selectId: (notification: Notification) => notification.id,
  });

export const initialNotificationsState: NotificationsState =
  notificationsAdapter.getInitialState();

const reducer = createReducer(
  initialNotificationsState,
  on(
    NotificationsActions.notificationReceived,
    (state, { notification }) =>
      notificationsAdapter.upsertOne(notification, { ...state, loaded: true })
  ),
  on(NotificationsActions.notificationEventSourceFailed, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function notificationsReducer(
  state: NotificationsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
