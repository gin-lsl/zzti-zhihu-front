import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { API_HOST, API, ResponseError } from '../../../utils/index';
import * as searchTextAction from '../actions/search-text.action';
import * as searchResultAction from '../actions/search-result.action';

@Injectable()
export class SearchEffects {

  private readonly apiSearch = API_HOST + '/questions/search';

  /**
   * 搜索
   */
  @Effect()
  search$: Observable<Action> = this._actions$
    .ofType(searchTextAction.SearchTextActionTypesEnum.Search)
    .map((action: searchTextAction.Search) => action.payload)
    .exhaustMap(searchText => (
      this._httpClient
        .get(this.apiSearch, { params: new HttpParams().append('search', searchText) })
        .map((res: API) => (
          res.success
            ? new searchResultAction.LoadSuccess(res.successResult)
            : new searchResultAction.LoadFailure(new ResponseError(res.errorCode, res.errorMessage))
        ))
    ));

  constructor(
    private _actions$: Actions,
    private _httpClient: HttpClient,
  ) { }
}
