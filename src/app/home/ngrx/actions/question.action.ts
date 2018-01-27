import { Action } from '@ngrx/store';

export enum QuestionActionTypesEnum {
  Load = '[Question] Load',
  Loading = '[Question] Loading',
  LoadSuccess = '[Question] LoadSuccess',
  LoadFailure = '[Question] LoadFailure',
  Up = '[Question] Up',
  UpSuccess = '[Question] Up Success',
  UpFailure = '[Question] Up Failure',
  CancelUp = '[Question] Cancel Up',
  CancelUpSuccess = '[Question] Cancel Up Success',
  CancelUpFailure = '[Question] Cancel Up Failure',
}

export class Load implements Action {
  readonly type = QuestionActionTypesEnum.Load;
  /**
   * @todo 此方法需要完善
   *
   * @param payload 条目数
   */
  constructor(public payload?: number) { }
}

export class Loading implements Action {
  readonly type = QuestionActionTypesEnum.Loading;
  constructor(public payload: string) { }
}

export class LoadSuccess implements Action {
  readonly type = QuestionActionTypesEnum.LoadSuccess;
  constructor(public payload: any) { }
}

export class LoadFailure implements Action {
  readonly type = QuestionActionTypesEnum.LoadFailure;
  constructor(public payload: any) { }
}

export class Up implements Action {
  readonly type = QuestionActionTypesEnum.Up;
  constructor(public payload: string) { }
}

export class UpSuccess implements Action {
  readonly type = QuestionActionTypesEnum.UpSuccess;
  constructor(public payload: {
    userId: string,
    questionId: string
  }) { }
}

export class UpFailure implements Action {
  readonly type = QuestionActionTypesEnum.UpFailure;
  constructor(public payload: any) { }
}

export class CancelUp implements Action {
  readonly type = QuestionActionTypesEnum.CancelUp;
  constructor(public payload: string) { }
}

export class CancelUpSuccess implements Action {
  readonly type = QuestionActionTypesEnum.CancelUpSuccess;
  constructor(public payload: {
    userId: string,
    questionId: string,
  }) { }
}

export class CancelUpFailure implements Action {
  readonly type = QuestionActionTypesEnum.CancelUpFailure;
  constructor(public payload: any) { }
}

export type QuestionActions
  = Load
  | Loading
  | LoadSuccess
  | LoadFailure
  | Up
  | UpSuccess
  | UpFailure
  | CancelUp
  | CancelUpSuccess
  | CancelUpFailure;
