import { createSelector } from '@ngrx/store';
import { IAppState } from '../app.state';
import { ILogState } from './log.reducer';

//select the log state from the app state
export const logState = (state: IAppState) => state.logState;

//selector for all logs
export const selectAllLogs = createSelector(
  logState,
  (state: ILogState) => state.logs
);

//status selector
export const logActionStatus = createSelector(
  logState,
  (state: ILogState) => state.status
);

// selector for log params
export const selectLogParams = createSelector(
  logState,
  (state: ILogState) => state.logParams
);
// selector for log count
export const selectLogCount = createSelector(
  logState,
  (state: ILogState) => state.count
);

//selector for a single log by id
export const selectLog = (id: number) =>
  createSelector(selectAllLogs, (logs) => logs.find((log) => log.id === id));
