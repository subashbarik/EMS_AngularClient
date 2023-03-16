import { createReducer, on } from '@ngrx/store';
import { IApiValidationErrorResponse } from 'src/app/shared/models/apierrorresponse';
import { IUser } from 'src/app/shared/models/user';
import {
  loadUser,
  loadUserError,
  loadUserSuccess,
  loginUser,
  loginUserError,
  loginUserSuccess,
  logOutUser,
  logOutUserSuccess,
  registerUser,
  registerUserError,
  registerUserSuccess,
} from './account.actions';

export interface IAccountState {
  user: IUser;
  status: string;
  error: string;
  apiErrorResponse: IApiValidationErrorResponse;
}

export const initialState: IAccountState = {
  user: null,
  status: '',
  error: '',
  apiErrorResponse: null,
};

export const accountReducer = createReducer(
  initialState,
  on(
    loginUser,
    (state): IAccountState => ({
      ...state,
      status: 'logging in',
      error: '',
      apiErrorResponse: null,
    })
  ),
  on(
    loginUserSuccess,
    (state, action): IAccountState => ({
      ...state,
      user: action.user,
      status: 'success',
      error: '',
      apiErrorResponse: null,
    })
  ),
  on(
    loginUserError,
    (state, action): IAccountState => ({
      ...state,
      user: null,
      status: 'login failed',
      error: '',
      apiErrorResponse: action.error,
    })
  ),
  on(logOutUser, (state) => ({
    ...state,
    status: 'logging out',
    error: '',
    apiErrorResponse: null,
  })),
  on(logOutUserSuccess, (state, { success: success }) => ({
    ...state,
    user: null,
    status: 'success',
    error: '',
    apiErrorResponse: null,
  })),
  on(registerUser, (state) => ({
    ...state,
    status: 'registering',
    error: '',
    apiErrorResponse: null,
  })),
  on(registerUserSuccess, (state, action) => ({
    ...state,
    user: action.user,
    status: 'success',
    error: '',
    apiErrorResponse: null,
  })),
  on(registerUserError, (state, action) => ({
    ...state,
    status: 'register failed',
    error: action.error.errors.Password || action.error.errors,
    apiErrorResponse: action.error,
  })),
  on(loadUser, (state) => ({
    ...state,
    status: 'loading',
    error: '',
    apiErrorResponse: null,
  })),
  on(loadUserSuccess, (state, action) => ({
    ...state,
    user: action.user,
    status: 'success',
    error: '',
    apiErrorResponse: null,
  })),
  on(loadUserError, (state, action) => ({
    ...state,
    user: null,
    status: 'Load user failed',
    error: action.error.errors,
    apiErrorResponse: null,
  }))
);
