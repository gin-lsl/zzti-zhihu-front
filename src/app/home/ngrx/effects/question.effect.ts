import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/exhaustMap';
import * as questionAction from '../actions/question.action';
import { API, ResponseError } from '../../../utils/index';

@Injectable()
export class QuestionEffects {

  /**
   * 加载多条问题信息
   */
  @Effect()
  loadMany$: Observable<Action> = this._actions$
    .ofType(questionAction.QuestionActionTypes.Load)
    .map((action: questionAction.Load) => action.payload)
    .exhaustMap(_ => (
      this._httpClient.get('http://localhost:3000/questions')
        .map((data: API) => (
          data.success
            ? new questionAction.LoadSuccess(data.successResult)
            : new questionAction.LoadFailure(new ResponseError(data.errorCode, data.errorMessage))
        ))
        .catch((error: API) => Observable.of(new questionAction.LoadFailure(new ResponseError(error.errorCode, error.errorMessage))))
    ));

  constructor(
    private _actions$: Actions,
    private _httpClient: HttpClient,
  ) { }
}
