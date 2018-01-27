import { Action } from '@ngrx/store';
import { User, ResponseError, API, ISignIn } from '../../../utils/index';

export enum AuthActionTypesEnum {
  SignIn = '[Auth] SignIn',
  SignOn = '[Auth] SignOn',
  SignOut = '[Auth] SignOut',
  SignInSuccess = '[Auth] SignInSuccess',
  SignInFailure = '[Auth] SignInFailure',
  SignInRedirect = '[Auth] SignInRedirect',
  SignOnSuccess = '[Auth] SignOnSuccess',
  SignOnFailure = '[Auth] SignOnFailure',
  CheckSignState = '[Auth] CheckSignState',
  AuthInitial = '[Auth] AuthInitial',
  LoadUserInformation = '[Auth] LoadUserInformation',
  LoadUserInformationSuccess = '[Auth] LoadUserInformationSuccess',
  LoadUserInformationFailure = '[Auth] LoadUserInformationFailure',
  ClearLogedUserState = '[Auth] Clear Loged User State',
  ClearLogedUserStateSuccess = '[Auth] Clear Loged User State Success',
}

export class SignIn implements Action {
  readonly type = AuthActionTypesEnum.SignIn;
  constructor(public payload: { email: string, password: string }) { }
}

export class SignOn implements Action {
  readonly type = AuthActionTypesEnum.SignOn;
  constructor(public payload: string) { }
}

export class SignOut implements Action {
  readonly type = AuthActionTypesEnum.SignOut;
}

export class SignInSuccess implements Action {
  readonly type = AuthActionTypesEnum.SignInSuccess;
  constructor(public payload: User | ISignIn) { }
}

export class SignInFailure implements Action {
  readonly type = AuthActionTypesEnum.SignInFailure;
  constructor(public payload: ResponseError) { }
}

export class SignOnSuccess implements Action {
  readonly type = AuthActionTypesEnum.SignOnSuccess;
  /** @param payload 激活的activeKey */
  constructor(public payload: string) { }
}

export class SignOnFailure implements Action {
  readonly type = AuthActionTypesEnum.SignOnFailure;
  constructor(public payload: ResponseError) { }
}

export class SignInRedirect implements Action {
  readonly type = AuthActionTypesEnum.SignInRedirect;
}

export class CheckSignState implements Action {
  readonly type = AuthActionTypesEnum.CheckSignState;
}

export class AuthInitial implements Action {
  readonly type = AuthActionTypesEnum.AuthInitial;
}

export class LoadUserInformation implements Action {
  readonly type = AuthActionTypesEnum.LoadUserInformation;

  /** @param payload 用户id */
  constructor(public payload: string) { }
}

export class LoadUserInformationSuccess implements Action {
  readonly type = AuthActionTypesEnum.LoadUserInformationSuccess;
  constructor(public payload: User) { }
}

export class LoadUserInformationFailure implements Action {
  readonly type = AuthActionTypesEnum.LoadUserInformationFailure;
}

export class ClearLogedUserState implements Action {
  readonly type = AuthActionTypesEnum.ClearLogedUserState;
}

export class ClearLogedUserStateSuccess implements Action {
  readonly type = AuthActionTypesEnum.ClearLogedUserStateSuccess;
}

export type AuthActions
  = SignIn
  | SignOn
  | SignOut
  | SignInSuccess
  | SignInFailure
  | SignOnSuccess
  | SignOnFailure
  | SignInRedirect
  | CheckSignState
  | AuthInitial
  | LoadUserInformation
  | LoadUserInformationSuccess
  | LoadUserInformationFailure
  | ClearLogedUserState
  | ClearLogedUserStateSuccess;
