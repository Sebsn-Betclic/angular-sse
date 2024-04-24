import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USER_FEATURE_KEY, UserState } from '../reducers/user.reducer';
import { User } from '../../../types/user.interface';

// Lookup the 'User' feature state managed by NgRx
export const selectUserState =
  createFeatureSelector<UserState>(USER_FEATURE_KEY);

export const selectCurrentUser = createSelector(
  selectUserState,
  (state) => state.user,
)

export const selectCurrentUserId = createSelector(
  selectCurrentUser,
  (user: User | null) => user?.id || 0,
)

export const selectCurrentUserFullName = createSelector(
  selectCurrentUser,
  (user: User | null) => user?.fullname || '',
)

export const selectWallet  = createSelector(
  selectUserState,
  (state) => state.wallet,
)
