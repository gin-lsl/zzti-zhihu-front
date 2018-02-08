import { Action } from '@ngrx/store';
import { ResponseError } from '../../../utils/index';

export enum UserActionTypesEnum {
  Load = '[User] Load',
  LoadSuccess = '[User] Load Success',
  LoadFailure = '[User] Load Failure',
}

export class Load implements Action {
  readonly type = UserActionTypesEnum.Load;
  constructor(public payload: any) { }
}

export class LoadSuccess implements Action {
  readonly type = UserActionTypesEnum.LoadSuccess;
  constructor(public payload: any) { }
}

export class LoadFailure implements Action {
  readonly type = UserActionTypesEnum.LoadFailure;
  constructor(public payload: ResponseError) { }
}

export type UserActions
  = Load
  | LoadSuccess
  | LoadFailure;
