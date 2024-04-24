import { createAction, props } from '@ngrx/store';
import { User } from '../../../types/user.interface';

export const userConnecting = createAction(
  '[User/Api] User connecting',
  props<{ userId: number }>(),
);

export const userConnected = createAction(
  '[User/Api] User connected',
  props<{ user: User }>(),
)


export const userConnectingFailed = createAction(
  '[User/Api] User connecting failed',
  props<{ error: string }>(),
)

export const userDisconnecting = createAction(
  '[User/Api] User disconnecting',
)
export const userDisconnected = createAction(
  '[User/Api] User disconnected',
)
