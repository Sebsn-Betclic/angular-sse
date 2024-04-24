import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  NOTIFICATIONS_FEATURE_KEY,
  NotificationsState,
  notificationsAdapter,
} from '../reducers/notifications.reducer';
import { Notification } from '../../../types/notification.interface';

// Lookup the 'Notifications' feature state managed by NgRx
export const selectNotificationsState =
  createFeatureSelector<NotificationsState>(NOTIFICATIONS_FEATURE_KEY);

const { selectAll, selectTotal } = notificationsAdapter.getSelectors(selectNotificationsState);

export const selectTotalNotifications = createSelector(
  selectTotal,
  (total: number) => total || 0,
);

export const selectNotifications = createSelector(
  selectAll,
  (notifications: Notification[]) => {
    notifications.sort((notificationA: Notification, notificationB: Notification) => new Date(notificationB.createdDate).getTime() - new Date(notificationA.createdDate).getTime())
    return notifications.slice(0, 5);
  },
);
