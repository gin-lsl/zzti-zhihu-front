import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/exhaustMap';
import * as questionAction from '../actions/question.action';
import { API, ResponseError, parseUserStorage } from '../../../utils/index';

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
      this._httpClient
        .get('http://localhost:3000/questions')
        .map((data: API) => (
          data.success
            ? new questionAction.LoadSuccess(data.successResult)
            : new questionAction.LoadFailure(new ResponseError(data.errorCode, data.errorMessage))
        ))
        .catch((error: API) => Observable.of(new questionAction.LoadFailure(new ResponseError(error.errorCode, error.errorMessage))))
    ));

  /**
   * 点赞
   */
  @Effect()
  up$: Observable<Action> = this._actions$
    .ofType(questionAction.QuestionActionTypes.Up)
    .map((action: questionAction.Up) => action.payload)
    .exhaustMap(_ => {
      console.log('点赞');
      const user = parseUserStorage();
      return this._httpClient
        .get('http://localhost:3000/questions/up/' + _, {
          headers: new HttpHeaders().append('Authorization', user.access_token)
        })
        .map((data: API) => (
          data.success
            ? new questionAction.UpSuccess({ userId: user.id, questionId: _ })
            : new questionAction.UpFailure(new ResponseError(data.errorCode, data.errorMessage))
        ))
        .catch((error: API) => Observable.of(new questionAction.UpFailure(new ResponseError(error.errorCode, error.errorMessage))));
    });

  /**
   * 取消点赞
   */
  @Effect()
  cancelUp$: Observable<Action> = this._actions$
    .ofType(questionAction.QuestionActionTypes.CancelUp)
    .map((action: questionAction.Up) => action.payload)
    .exhaustMap(_ => {
      const user = parseUserStorage();
      return this._httpClient
        .get('http://localhost:3000/questions/cancel-up/' + _, {
          headers: new HttpHeaders().append('Authorization', user.access_token)
        })
        .map((data: API) => (
          data.success
            ? new questionAction.CancelUpSuccess({ userId: user.id, questionId: _ })
            : new questionAction.CancelUpFailure(new ResponseError(data.errorCode, data.errorMessage))
        ))
        .catch((error: API) => Observable.of(new questionAction.CancelUpFailure(new ResponseError(error.errorCode, error.errorMessage))));
    });

  constructor(
    private _actions$: Actions,
    private _httpClient: HttpClient,
  ) { }
}
