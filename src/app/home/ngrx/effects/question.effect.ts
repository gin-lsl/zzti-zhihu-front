import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/exhaustMap';
import * as questionAction from '../actions/question.action';
import { API, ResponseError, parseUserStorage, ErrorCodeEnum } from '../../../utils/index';
import { MatSnackBar } from '@angular/material';
import * as authAction from '../../../core/ngrx/actions/auth.action';

@Injectable()
export class QuestionEffects {

  /**
   * 加载多条问题信息
   */
  @Effect()
  loadMany$: Observable<Action> = this._actions$
    .ofType(questionAction.QuestionActionTypesEnum.Load)
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
    .ofType(questionAction.QuestionActionTypesEnum.Up)
    .map((action: questionAction.Up) => action.payload)
    .exhaustMap(_ => {
      const user = parseUserStorage();
      if (!user) {
        this.checkShowAuthPop();
        return Observable.empty();
      }
      return this._httpClient
        .get('http://localhost:3000/questions/up/' + _, {
          headers: new HttpHeaders().append('Authorization', user.access_token)
        })
        .map((data: API) => {
          if (data.success) {
            return new questionAction.UpSuccess({ userId: user.id, questionId: _ });
          } else {
            this.checkShowAuthPop(data.errorCode);
            return new questionAction.UpFailure(new ResponseError(data.errorCode, data.errorMessage));
          }
        })
        .catch((error: API) => {
          this.checkShowAuthPop(error.errorCode);
          return Observable.of(new questionAction.UpFailure(new ResponseError(error.errorCode, error.errorMessage)));
        });
    });

  /**
   * 取消点赞
   */
  @Effect({ dispatch: false })
  cancelUp$: Observable<Action> = this._actions$
    .ofType(questionAction.QuestionActionTypesEnum.CancelUp)
    .map((action: questionAction.Up) => action.payload)
    .exhaustMap(_ => {
      const user = parseUserStorage();
      if (!user) {
        this.checkShowAuthPop();
        return Observable.empty();
      }
      return this._httpClient
        .get('http://localhost:3000/questions/cancel-up/' + _, {
          headers: new HttpHeaders().append('Authorization', user.access_token)
        })
        .map((data: API) => {
          if (data.success) {
            return new questionAction.CancelUpSuccess({ userId: user.id, questionId: _ });
          } else {
            this.checkShowAuthPop(data.errorCode);
            return new questionAction.CancelUpFailure(new ResponseError(data.errorCode, data.errorMessage));
          }
        })
        .catch((error: API) => {
          this.checkShowAuthPop(error.errorCode);
          return Observable.of(new questionAction.CancelUpFailure(new ResponseError(error.errorCode, error.errorMessage)));
        });
    });

  constructor(
    private _actions$: Actions,
    private _httpClient: HttpClient,
    private _snackBar: MatSnackBar,
    private _store: Store<any>,
  ) { }

  /**
   * 根据错误码检查是否需要登录提示
   * @param errorCode 错误码
   */
  checkShowAuthPop(errorCode: ErrorCodeEnum = ErrorCodeEnum.AUTHORIZATION): void {
    if (errorCode === ErrorCodeEnum.AUTHORIZATION) {
      this._snackBar.open('没有权限, 请先登录', 'close', {
        duration: 2000,
      });
      this._store.dispatch(new authAction.ClearLogedUserState());
    }
  }
}
