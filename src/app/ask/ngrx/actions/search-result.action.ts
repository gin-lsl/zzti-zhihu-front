import { Action } from '@ngrx/store';

export enum SearchResultActionTypesEnum {
  Load = '[SearchResult] Load',
  LoadSuccess = '[SearchResult] Load Success',
  LoadFailure = '[SearchResult] Load Failure',
}

export class Load implements Action {
  readonly type = SearchResultActionTypesEnum.Load;
  constructor(public payload: any) { }
}

export class LoadSuccess implements Action {
  readonly type = SearchResultActionTypesEnum.LoadSuccess;
  constructor(public payload: any) { }
}

export class LoadFailure implements Action {
  readonly type = SearchResultActionTypesEnum.LoadFailure;
  constructor(public payload: any) { }
}

export type SearchResultActions
  = Load
  | LoadSuccess
  | LoadFailure;
