import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as BettingsActions from '../actions/bettings.actions';
import { Betting } from '../../../types/betting.interface';

export const BETTINGS_FEATURE_KEY = 'bettings';

export type BettingsState = EntityState<Betting>;

export interface BettingsPartialState {
  readonly [BETTINGS_FEATURE_KEY]: BettingsState;
}

export const bettingsAdapter: EntityAdapter<Betting> = createEntityAdapter<Betting>({
  selectId: (betting: Betting) => betting.id,
});

export const initialBettingsState: BettingsState = bettingsAdapter.getInitialState();

const reducer = createReducer(
  initialBettingsState,
  on(BettingsActions.loadBettingsSuccess, (state, { bettings }) =>
    bettingsAdapter.setAll(bettings, { ...state, loaded: true })
  ),
  on(BettingsActions.loadBettingsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function bettingsReducer(
  state: BettingsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
