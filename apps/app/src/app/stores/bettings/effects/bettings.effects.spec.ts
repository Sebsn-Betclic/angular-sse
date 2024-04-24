import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as BettingsActions from '../actions/bettings.actions';
import { BettingsEffects } from './bettings.effects';

describe('BettingsEffects', () => {
  let actions: Observable<Action>;
  let effects: BettingsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        BettingsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(BettingsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: BettingsActions.initBettings() });

      const expected = hot('-a-|', {
        a: BettingsActions.loadBettingsSuccess({ bettings: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
