import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as WalletActions from '../../wallets/actions/wallet.actions';
import * as UserActions from '../actions/user.actions';
import { User } from '../../../types/user.interface';

const getUserConnected = (): User | null => {
  const userStoraged = sessionStorage.getItem('userConnected');
  return userStoraged ? JSON.parse(userStoraged) : null;
}
const user = getUserConnected();

export const USER_FEATURE_KEY = 'user';

export interface UserState {
  user: User | null;
  wallet: number;
  loaded: boolean; // has the User list been loaded
}

export interface UserPartialState {
  readonly [USER_FEATURE_KEY]: UserState;
}

export const userAdapter: EntityAdapter<User> =
  createEntityAdapter<User>({
    selectId: (user: User) => user.id
  });

export const initialUserState: UserState = {
  user,
  wallet: user?.wallet || 0,
  loaded: false,
}

const reducer = createReducer(
  initialUserState,
  on(UserActions.userConnected, (state, { user }) =>
    ({ ...state, user, wallet: user.wallet, loaded: true })
  ),
  on(WalletActions.walletReceived, (state, {wallet}) =>
    ({ ...state, wallet })
  ),
  on(UserActions.userDisconnecting, (state) =>
    ({ ...state, user: null, loaded: false })
  ),
);

export function userReducer(state: UserState | undefined, action: Action) {
  return reducer(state, action);
}
