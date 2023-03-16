import { createAction, props } from '@ngrx/store';
import { ILog } from 'src/app/shared/models/log';
import { ILogParams } from 'src/app/shared/models/logParams';
export const loadLogs = createAction('[log list] Load');
export const loadLogsSuccess = createAction(
  '[log list] Success',
  props<{ logs: ILog[]; count: number }>()
);

export const setLogParams = createAction(
  '[log] set params',
  props<{ params: ILogParams }>()
);
export const resetLogParams = createAction('[log] reset params');
