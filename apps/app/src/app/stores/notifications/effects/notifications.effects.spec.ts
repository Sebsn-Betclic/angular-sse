import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as NotificationsActions from '../actions/notifications.actions';
import { NotificationsEffects } from './notifications.effects';

describe('NotificationsEffects', () => {
  let actions: Observable<Action>;
  let effects: NotificationsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        NotificationsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(NotificationsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: NotificationsActions.notificationEventSourceInitializing() });

      const expected = hot('-a-|', {
        a: NotificationsActions.notificationEventSourceInitializing({ notifications: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
