import { Action } from '@ngrx/store';

export enum QuestionActionTypes {
  Load = '[Question] Load',
  Loading = '[Question] Loading',
  LoadSuccess = '[Question] LoadSuccess',
  LoadFailure = '[Question] LoadFailure',
}

export class Load implements Action {
  readonly type = QuestionActionTypes.Load;
  /**
   * @todo 此方法需要完善
   *
   * @param payload 条目数
   */
  constructor(public payload?: number) { }
}

export class Loading implements Action {
  readonly type = QuestionActionTypes.Loading;
  constructor(public payload: string) { }
}

export class LoadSuccess implements Action {
  readonly type = QuestionActionTypes.LoadSuccess;
  constructor(public payload: any) {
    console.log('LoadSuccess: ', payload);
  }
}

export class LoadFailure implements Action {
  readonly type = QuestionActionTypes.LoadFailure;
  constructor(public payload: any) { }
}

export type QuestionActions
  = Load
  | Loading
  | LoadSuccess
  | LoadFailure;
