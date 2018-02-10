import { Action } from '@ngrx/store';

export enum SearchTextActionTypesEnum {
  SearchTextChange = '[SearchText] Search Text Change',
  Search = '[SearchText] Search'
}

export class SearchTextChange implements Action {
  readonly type = SearchTextActionTypesEnum.SearchTextChange;
  constructor(public payload: string) { }
}

export class Search implements Action {
  readonly type = SearchTextActionTypesEnum.Search;
  constructor(public payload: string) { }
}

export type SearchTextActions
  = SearchTextChange
  | Search;
