import { createSelector } from '@ngrx/store';
import { IAppState } from '../app.state';
import { IGlobalState } from './appglobal.reducer';

//select the department state from the app state
export const globalState = (state: IAppState) => state.globalState;

//selector for main golbal object
export const selectGlobal = createSelector(
  globalState,
  (state: IGlobalState) => state.global
);

//status selector
export const globalLoadingStatus = createSelector(
  globalState,
  (state: IGlobalState) => state.status
);

// selector for company info
export const selectCompanyInfo = createSelector(
  globalState,
  (state: IGlobalState) => state.global.companyInfo
);
// selector for company info
export const selectAppConfiguration = createSelector(
  globalState,
  (state: IGlobalState) => state.global.serverAppConfigurations
);
