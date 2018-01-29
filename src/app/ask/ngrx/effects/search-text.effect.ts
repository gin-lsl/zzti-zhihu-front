import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as searchTextAction from '../actions/search-text.action';

@Injectable()
export class SearchTextEffects {

  /**
   * 搜索
   */
  @Effect() search$: Observable<Action> = this.actions$
    .ofType(searchTextAction.SearchTextActionTypesEnum.Search);

  constructor(
    private actions$: Actions
  ) { }
}
