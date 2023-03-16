import { createSelector } from '@ngrx/store';
import { IAppState } from '../app.state';
import { IAccountState } from './account.reducer';

export const accountState = (state: IAppState) => state.accState;
export const selectUser = createSelector(
  accountState,
  (state: IAccountState) => state.user
);
//status selector
export const accountStatusSelector = createSelector(
  accountState,
  (state: IAccountState) => state.status
);
export const accountTokenSelector = createSelector(
  accountState,
  (state: IAccountState) => state.user.token
);
export const accountErrorSelector = createSelector(
  accountState,
  (state: IAccountState) => state.error
);
