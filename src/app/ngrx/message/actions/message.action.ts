import { Action } from '@ngrx/store';

export enum MessageActionTypesEnum {
  Load = '[Message] Load',
  LoadSuccess = '[Message] Load Success',
  LoadFailure = '[Message] Load Failure',
}

export class Load implements Action {
  readonly type = MessageActionTypesEnum.Load;

  constructor() { }
}

export class LoadSuccess implements Action {
  readonly type = MessageActionTypesEnum.LoadSuccess;
  constructor(public payload: any) { }
}

export class LoadFailure implements Action {
  readonly type = MessageActionTypesEnum.LoadFailure;
  constructor(public payload: any) { }
}

export type MessageActions
  = Load
  | LoadSuccess
  | LoadFailure;
