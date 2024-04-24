import { NotificationsEntity } from './notifications.models';
import {
  notificationsAdapter,
  NotificationsPartialState,
  initialNotificationsState,
} from '../reducers/notifications.reducer';
import * as NotificationsSelectors from './notifications.selectors';

describe('Notifications Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getNotificationsId = (it: NotificationsEntity) => it.id;
  const createNotificationsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as NotificationsEntity);

  let state: NotificationsPartialState;

  beforeEach(() => {
    state = {
      notifications: notificationsAdapter.setAll(
        [
          createNotificationsEntity('PRODUCT-AAA'),
          createNotificationsEntity('PRODUCT-BBB'),
          createNotificationsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialNotificationsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Notifications Selectors', () => {
    it('selectAllNotifications() should return the list of Notifications', () => {
      const results = NotificationsSelectors.selectAllNotifications(state);
      const selId = getNotificationsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = NotificationsSelectors.selectEntity(
        state
      ) as NotificationsEntity;
      const selId = getNotificationsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectNotificationsLoaded() should return the current "loaded" status', () => {
      const result = NotificationsSelectors.selectNotificationsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectNotificationsError() should return the current "error" state', () => {
      const result = NotificationsSelectors.selectNotificationsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
