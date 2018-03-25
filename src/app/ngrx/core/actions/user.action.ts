import { Action } from '@ngrx/store';
import { User, ResponseError } from '../../../utils/index';

export enum UserActionTypesEnum {
  SignIn = '[User] Sign In',
  SignOut = '[User] Sign Out',
  SignSuccess = '[User] Sign Success',
  SignFailure = '[User] Sign Failure',
  SignInRedirect = '[User] Sign InRedirect',
  Load = '[User] Load',
  LoadSuccess = '[User] Load Success',
  LoadFailure = '[User] Load Failure',

  ChangePostedQuestionsSort = '[User] Change Posted Questions Sort',
  ChangePostedRepliesSort = '[User] Change Posted Replies Sort',

  Follow = '[User] Follow',
  FollowSuccess = '[User] Follow Success',
  FollowFailure = '[User] Follow Failure',

  CancelFollow = '[User] Cancel Follow',
  CancelFollowSuccess = '[User] Cancel Follow Success',
  CancelFollowFailure = '[User] Cancel Follow Failure',
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

export class ChangePostedQuestionsSort implements Action {
  readonly type = UserActionTypesEnum.ChangePostedQuestionsSort;
  constructor(public payload: 'NEWER_TO_OLDER' | 'OLDER_TO_NEWER' | 'AGREE') { }
}

export class ChangePostedRepliesSort implements Action {
  readonly type = UserActionTypesEnum.ChangePostedRepliesSort;
  constructor(public payload: 'NEWER_TO_OLDER' | 'OLDER_TO_NEWER' | 'AGREE') { }
}

export class Follow implements Action {
  readonly type = UserActionTypesEnum.Follow;
  constructor(public payload: string) { }
}

export class FollowSuccess implements Action {
  readonly type = UserActionTypesEnum.FollowSuccess;
  constructor(public payload: any) { }
}

export class FollowFailure implements Action {
  readonly type = UserActionTypesEnum.FollowFailure;
  constructor(public payload: ResponseError) { }
}

export class CancelFollow implements Action {
  readonly type = UserActionTypesEnum.CancelFollow;
  constructor(public payload: string) { }
}

export class CancelFollowSuccess implements Action {
  readonly type = UserActionTypesEnum.CancelFollowSuccess;
  constructor(public payload: any) { }
}

export class CancelFollowFailure implements Action {
  readonly type = UserActionTypesEnum.CancelFollowFailure;
  constructor(public payload: ResponseError) { }
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
  | ChangePostedQuestionsSort
  | ChangePostedRepliesSort
  | Follow
  | FollowSuccess
  | CancelFollow
  | CancelFollowSuccess;
