import { ApiValidationErrorResponse } from 'src/app/shared/models/apierrorresponse';
import { ILogin, IUser } from 'src/app/shared/models/user';

export function getValidUserLoginData(): ILogin {
  let loginData: ILogin;
  loginData = {
    email: 'subash.barik@gmail.com',
    password: 'Pa$$w0rd',
    rememberMe: false,
  };
  return loginData;
}
export function getInvalidUserLoginData(): ILogin {
  let loginData: ILogin;
  loginData = {
    email: 'subash11111.barik@gmail.com',
    password: 'Pa$$w0rd',
    rememberMe: false,
  };
  return loginData;
}

export function getValidUserLoginResponseData(): IUser {
  let userData: IUser;
  userData = {
    email: 'subash.barik@gmail.com',
    displayName: 'Root',
    isAdmin: true,
    roles: ['Admin', 'User'],
    apiErrorResponse: null,
    token: '',
  };
  return userData;
}
export function getInvalidUserLoginResponseData(): IUser {
  let userData: IUser;
  userData = {
    email: null,
    displayName: null,
    isAdmin: null,
    roles: null,
    apiErrorResponse: new ApiValidationErrorResponse(
      ['Unable to find User.'],
      '401',
      'You are not authorized'
    ),
    token: null,
  };
  return userData;
}
