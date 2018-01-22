import { Action } from '@ngrx/store';
import { User, ResponseError, API, ISignIn } from '../../../utils/index';

export enum AuthActionTypes {
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
}

export class SignIn implements Action {
  readonly type = AuthActionTypes.SignIn;
  constructor(public payload: { email: string, password: string }) { }
}

export class SignOn implements Action {
  readonly type = AuthActionTypes.SignOn;
  constructor(public payload: string) { }
}

export class SignOut implements Action {
  readonly type = AuthActionTypes.SignOut;
}

export class SignInSuccess implements Action {
  readonly type = AuthActionTypes.SignInSuccess;
  constructor(public payload: User | ISignIn) { }
}

export class SignInFailure implements Action {
  readonly type = AuthActionTypes.SignInFailure;
  constructor(public payload: ResponseError) { }
}

export class SignOnSuccess implements Action {
  readonly type = AuthActionTypes.SignOnSuccess;
  /** @param payload 激活的activeKey */
  constructor(public payload: string) { }
}

export class SignOnFailure implements Action {
  readonly type = AuthActionTypes.SignOnFailure;
  constructor(public payload: ResponseError) { }
}

export class SignInRedirect implements Action {
  readonly type = AuthActionTypes.SignInRedirect;
}

export class CheckSignState implements Action {
  readonly type = AuthActionTypes.CheckSignState;
}

export class AuthInitial implements Action {
  readonly type = AuthActionTypes.AuthInitial;
}

export class LoadUserInformation implements Action {
  readonly type = AuthActionTypes.LoadUserInformation;

  /** @param payload 用户id */
  constructor(public payload: string) { }
}

export class LoadUserInformationSuccess implements Action {
  readonly type = AuthActionTypes.LoadUserInformationSuccess;
  constructor(public payload: User) { }
}

export class LoadUserInformationFailure implements Action {
  readonly type = AuthActionTypes.LoadUserInformationFailure;
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
  | LoadUserInformationFailure;
