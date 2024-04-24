import { Action } from '@ngrx/store';

import * as BettingsActions from '../actions/bettings.actions';
import { BettingsEntity } from './bettings.models';
import {
  BettingsState,
  initialBettingsState,
  bettingsReducer,
} from './bettings.reducer';

describe('Bettings Reducer', () => {
  const createBettingsEntity = (id: string, name = ''): BettingsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Bettings actions', () => {
    it('loadBettingsSuccess should return the list of known Bettings', () => {
      const bettings = [
        createBettingsEntity('PRODUCT-AAA'),
        createBettingsEntity('PRODUCT-zzz'),
      ];
      const action = BettingsActions.loadBettingsSuccess({ bettings });

      const result: BettingsState = bettingsReducer(
        initialBettingsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = bettingsReducer(initialBettingsState, action);

      expect(result).toBe(initialBettingsState);
    });
  });
});
