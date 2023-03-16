import { createReducer, on } from '@ngrx/store';
import { ILog } from 'src/app/shared/models/log';
import { ILogParams, LogParams } from 'src/app/shared/models/logParams';
import {
  loadLogs,
  loadLogsSuccess,
  resetLogParams,
  setLogParams,
} from './log.actions';

export interface ILogState {
  logs: ILog[];
  status: string;
  error: string;
  count: number;
  logParams: ILogParams;
}
export const initialState: ILogState = {
  logs: [],
  status: '',
  error: '',
  count: 0,
  logParams: new LogParams(),
};

export const logReducer = createReducer(
  initialState,
  on(setLogParams, (state, { params }) => ({
    ...state,
    logParams: params,
  })),
  on(resetLogParams, (state) => ({
    ...state,
    logParams: new LogParams(),
  })),
  on(loadLogs, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(loadLogsSuccess, (state, { logs, count }) => ({
    ...state,
    logs: logs,
    status: 'success',
    count: count,
    error: '',
  }))
);
