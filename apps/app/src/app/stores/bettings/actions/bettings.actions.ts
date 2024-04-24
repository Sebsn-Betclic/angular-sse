import { createAction, props } from '@ngrx/store';
import { Betting } from '../../../types/betting.interface';

export const initBettings = createAction('[Bettings Page] Init');

export const loadBettingsSuccess = createAction(
  '[Bettings/API] Load Bettings Success',
  props<{ bettings: Betting[] }>()
);

export const loadBettingsFailure = createAction(
  '[Bettings/API] Load Bettings Failure',
  props<{ error: any }>()
);

export const createBet = createAction(
  '[Bettings/Api] Create Bet',
  props<{ betId: string }>(),
);

export const createBetSuccess = createAction(
  '[Bettings/Api] Create Bet Success',
);

export const createBetFailure = createAction(
  '[Bettings/Api] Create Bet Failure',
  props<{ error: any }>(),
)
