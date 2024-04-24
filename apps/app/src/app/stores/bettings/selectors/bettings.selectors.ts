import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  BETTINGS_FEATURE_KEY,
  BettingsState,
  bettingsAdapter,
} from '../reducers/bettings.reducer';
import { Betting } from '../../../types/betting.interface';

// Lookup the 'Bettings' feature state managed by NgRx
export const selectBettingsState =
  createFeatureSelector<BettingsState>(BETTINGS_FEATURE_KEY);

const { selectAll } = bettingsAdapter.getSelectors(selectBettingsState);

export const selectAllBettings = createSelector(
  selectAll,
  (bettings: Betting[]) => bettings
);

