export interface IUser {
  email: string;
  displayName: string;
  token: string;
  roles: string[];
  isAdmin: boolean;
  apiErrorResponse: any;
}
export interface ILogin {
  email: string;
  password: string;
  rememberMe: boolean;
}
export interface IRegister {
  displayname: string;
  email: string;
  password: string;
}
export class Login implements ILogin {
  email: string;
  password: string;
  rememberMe: boolean;
  constructor(email: string, password: string, rememberMe: boolean) {
    this.email = email;
    this.password = password;
    this.rememberMe = rememberMe;
  }
}
export class Register implements IRegister {
  displayname: string;
  email: string;
  password: string;
  constructor(displayname: string, email: string, password: string) {
    this.displayname = displayname;
    this.email = email;
    this.password = password;
  }
}
export enum Roles {
  Admin = 'Admin',
  User = 'User',
}
