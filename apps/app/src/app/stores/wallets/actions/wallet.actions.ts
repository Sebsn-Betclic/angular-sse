import { createAction, props } from '@ngrx/store';

export const walletEventSourceInitializing = createAction('[Wallet Page] Init');

export const walletEventSourceInitialized = createAction(
  '[Wallet/API] Load Wallet Success'
);

export const walletEventSourceFailed = createAction(
  '[Wallet/API] Load Wallet Failure',
  props<{ error: any }>()
);

export const walletReceived = createAction(
  '[Wallet/API] Received Wallet',
  props<{ wallet: number }>(),
)
