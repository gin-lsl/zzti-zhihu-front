import { Action } from '@ngrx/store';
import { User, ResponseError } from '../../../utils/index';

export enum UserActionTypesEnum {
  SignIn = '[User] SignIn',
  SignOut = '[User] SignOut',
  SignSuccess = '[User] SignSuccess',
  SignFailure = '[User] SignFailure',
  SignInRedirect = '[User] SignInRedirect',
  Load = '[User] Load',
  LoadSuccess = '[User] LoadSuccess',
  LoadFailure = '[User] LoadFailure',
  ChangePostedSort = '[User] Change Posted Sort',
}

export class SignIn implements Action {
  readonly type = UserActionTypesEnum.SignIn;
  constructor(public payload: any) { }
}

export class SignOut implements Action {
  readonly type = UserActionTypesEnum.SignOut;
}

export class SignSuccess implements Action {
  readonly type = UserActionTypesEnum.SignSuccess;
  constructor(public payload: User) { }
}

export class SignFailure implements Action {
  readonly type = UserActionTypesEnum.SignFailure;
  constructor(public payload: ResponseError) { }
}

export class SignInRedirect implements Action {
  readonly type = UserActionTypesEnum.SignInRedirect;
}

export class Load implements Action {
  readonly type = UserActionTypesEnum.Load;
  constructor(public payload: string) { }
}

export class LoadSuccess implements Action {
  readonly type = UserActionTypesEnum.LoadSuccess;
  constructor(public payload: any) { }
}

export class LoadFailure implements Action {
  readonly type = UserActionTypesEnum.LoadFailure;
  constructor(public payload: any) { }
}

export class ChangePostedSort implements Action {
  readonly type = UserActionTypesEnum.ChangePostedSort;
  constructor(public payload: 'NEWER_TO_OLDER' | 'OLDER_TO_NEWER' | 'AGREE') { }
}

export type UserActions
  = SignIn
  | SignOut
  | SignSuccess
  | SignFailure
  | SignInRedirect
  | Load
  | LoadSuccess
  | LoadFailure
  | ChangePostedSort;
