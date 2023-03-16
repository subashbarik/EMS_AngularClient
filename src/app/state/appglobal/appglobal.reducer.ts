import { createReducer, on } from '@ngrx/store';
import { IGlobal } from 'src/app/shared/models/global';
import { loadGlobal, loadGlobalSuccess } from './appglobal.actions';

export interface IGlobalState {
  global: IGlobal;
  status: string;
  error: string;
}

export const initialState: IGlobalState = {
  global: null,
  status: '',
  error: '',
};

export const globalReducer = createReducer(
  initialState,
  on(loadGlobal, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(loadGlobalSuccess, (state, { global }) => ({
    ...state,
    global: global,
    status: 'success',
    error: '',
  }))
);
