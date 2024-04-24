import { createAction, props } from '@ngrx/store';
import { Notification } from '../../../types/notification.interface';

export const appInitialized = createAction(
  '[Initialization] App Started',
  props<{ userAlreadyConnected: boolean}>());

export const notificationEventSourceInitializing = createAction('[Notifications Page] Init');

export const notificationEventSourceInitialized = createAction(
  '[Notifications/API] Load Notifications Success'
);

export const notificationEventSourceFailed = createAction(
  '[Notifications/API] Load Notifications Failure',
  props<{ error: any }>()
);

export const notificationReceived = createAction(
  '[Notifications/API] Received Notifications',
  props<{ notification: Notification }>(),
)

export const notificationGenerated = createAction(
  '[Notification Actions] created'
)

export const notificationGenerateSuccessfully = createAction(
  '[Notification Actions] created successfully'
)

export const notificationGenerateFailed = createAction(
  '[Notification Actions] created failed'
)
