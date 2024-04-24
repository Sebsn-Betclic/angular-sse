import { BettingsEntity } from './bettings.models';
import {
  bettingsAdapter,
  BettingsPartialState,
  initialBettingsState,
} from '../reducers/bettings.reducer';
import * as BettingsSelectors from './bettings.selectors';

describe('Bettings Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getBettingsId = (it: BettingsEntity) => it.id;
  const createBettingsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as BettingsEntity);

  let state: BettingsPartialState;

  beforeEach(() => {
    state = {
      bettings: bettingsAdapter.setAll(
        [
          createBettingsEntity('PRODUCT-AAA'),
          createBettingsEntity('PRODUCT-BBB'),
          createBettingsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialBettingsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Bettings Selectors', () => {
    it('selectAllBettings() should return the list of Bettings', () => {
      const results = BettingsSelectors.selectAllBettings(state);
      const selId = getBettingsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = BettingsSelectors.selectEntity(state) as BettingsEntity;
      const selId = getBettingsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectBettingsLoaded() should return the current "loaded" status', () => {
      const result = BettingsSelectors.selectBettingsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectBettingsError() should return the current "error" state', () => {
      const result = BettingsSelectors.selectBettingsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
