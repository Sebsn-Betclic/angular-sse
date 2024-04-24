import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as WalletActions from '../actions/wallet.actions';
import { WalletEffects } from './wallet.effects';

describe('WalletEffects', () => {
  let actions: Observable<Action>;
  let effects: WalletEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        WalletEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(WalletEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: WalletActions.initWallet() });

      const expected = hot('-a-|', {
        a: WalletActions.loadWalletSuccess({ wallet: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
