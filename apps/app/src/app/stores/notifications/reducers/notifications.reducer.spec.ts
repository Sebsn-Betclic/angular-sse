import { Action } from '@ngrx/store';

import * as NotificationsActions from '../actions/notifications.actions';
import { NotificationsEntity } from './notifications.models';
import {
  NotificationsState,
  initialNotificationsState,
  notificationsReducer,
} from './notifications.reducer';

describe('Notifications Reducer', () => {
  const createNotificationsEntity = (
    id: string,
    name = ''
  ): NotificationsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Notifications actions', () => {
    it('loadNotificationsSuccess should return the list of known Notifications', () => {
      const notifications = [
        createNotificationsEntity('PRODUCT-AAA'),
        createNotificationsEntity('PRODUCT-zzz'),
      ];
      const action = NotificationsActions.notificationEventSourceInitializing({
        notifications,
      });

      const result: NotificationsState = notificationsReducer(
        initialNotificationsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = notificationsReducer(initialNotificationsState, action);

      expect(result).toBe(initialNotificationsState);
    });
  });
});
