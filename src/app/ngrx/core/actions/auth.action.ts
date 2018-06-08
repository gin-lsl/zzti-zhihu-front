import { Action } from '@ngrx/store';
import { User, ResponseError, API, ISignIn } from '../../../utils/index';

export enum AuthActionTypesEnum {
  SignIn = '[Auth] Sign In',
  SignOn = '[Auth] Sign On',
  SignOut = '[Auth] Sign Out',
  SignInSuccess = '[Auth] Sign In Success',
  SignInFailure = '[Auth] Sign In Failure',
  SignInRedirect = '[Auth] Sign In Redirect',
  SignOnSuccess = '[Auth] Sign On Success',
  SignOnFailure = '[Auth] Sign On Failure',
  CheckSignState = '[Auth] Check Sign State',
  AuthInitial = '[Auth] Auth Initial',
  LoadUserInformation = '[Auth] Load User Information',
  LoadUserInformationSuccess = '[Auth] Load User Information Success',
  LoadUserInformationFailure = '[Auth] Load User Information Failure',
  ClearLogedUserState = '[Auth] Clear Loged User State',
  ClearLogedUserStateSuccess = '[Auth] Clear Loged User State Success',
  Load = '[Auth] Load',
  LoadSuccess = '[Auth] Load Success',
  LoadFailure = '[Auth] Load Failure',
}

export class Load implements Action {
  readonly type = AuthActionTypesEnum.Load;
  constructor(public payload: string) { }
}

export class LoadSuccess implements Action {
  readonly type = AuthActionTypesEnum.LoadSuccess;
  constructor(public payload: any) { }
}

export class LoadFailure implements Action {
  readonly type = AuthActionTypesEnum.LoadFailure;
  constructor(public payload: any) { }
}

export class SignIn implements Action {
  readonly type = AuthActionTypesEnum.SignIn;
  constructor(public payload: {
    email: string;
    password: string;
    isAdmin?: boolean;
  }) { }
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
  constructor(public payload?: string) {
    console.log('load================: ', payload);
  }
}

export class LoadUserInformationSuccess implements Action {
  readonly type = AuthActionTypesEnum.LoadUserInformationSuccess;
  constructor(public payload: any) {
    console.log('---------------: ', payload);
  }
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
  | ClearLogedUserStateSuccess
  | Load
  | LoadSuccess
  | LoadFailure;
