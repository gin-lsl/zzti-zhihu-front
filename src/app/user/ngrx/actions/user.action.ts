import { Action } from '@ngrx/store';
import { User, ResponseError } from '../../../utils/index';

export enum UserActionTypes {
  SignIn = '[User] SignIn',
  SignOut = '[User] SignOut',
  SignSuccess = '[User] SignSuccess',
  SignFailure = '[User] SignFailure',
  SignInRedirect = '[User] SignInRedirect',
}

export class SignIn implements Action {
  readonly type = UserActionTypes.SignIn;
  constructor(public payload: any) { }
}

export class SignOut implements Action {
  readonly type = UserActionTypes.SignOut;
}

export class SignSuccess implements Action {
  readonly type = UserActionTypes.SignSuccess;
  constructor(public payload: User) { }
}

export class SignFailure implements Action {
  readonly type = UserActionTypes.SignFailure;
  constructor(public payload: ResponseError) { }
}

export class SignInRedirect implements Action {
  readonly type = UserActionTypes.SignInRedirect;
}

export type UserActions
  = SignIn
  | SignOut
  | SignSuccess
  | SignFailure
  | SignInRedirect;
