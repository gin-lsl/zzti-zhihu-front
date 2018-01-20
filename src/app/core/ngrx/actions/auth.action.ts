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

export type AuthActions
  = SignIn
  | SignOn
  | SignOut
  | SignInSuccess
  | SignInFailure
  | SignOnSuccess
  | SignOnFailure
  | SignInRedirect;
