import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import * as askAction from '../actions/ask.action';
import * as authAction from '../../../core/ngrx/actions/auth.action';
import * as questionAction from '../../../home/ngrx/actions/question.action';
import { API_HOST, API, ResponseError, parseUserStorage, ErrorCodeEnum } from '../../../utils/index';

const NO_AUTH_POP_ALITER = ['操作失败, 请先登录.', 'close', { duration: 2000 }];

@Injectable()
export class AskEffects {

  private readonly apiPost: string = API_HOST + '/questions/post';

  /**
   * 发送问题
   */
  @Effect()
  postQuestion$: Observable<Action> = this._actions$
    .ofType(askAction.AskActionTypesEnum.Post)
    .map((action: askAction.Post) => action.payload)
    .exhaustMap(_ => {
      const user = parseUserStorage();
      if (!user) {
        this.checkShowAuthPop();
        return Observable.of(new askAction.PostFailure({
          ..._,
          ...new ResponseError(ErrorCodeEnum.AUTHORIZATION)
        }));
      }
      return this._httpClient.post(this.apiPost, _, {
        headers: new HttpHeaders().append('Authorization', user.access_token)
      })
        .map((res: API<string>) => {
          if (res.success) {
            // this._router.navigateByUrl('/question/' + res.successResult);
            this._store.dispatch(new questionAction.LoadOne(res.successResult, true));
            return new askAction.PostSuccess();
          } else {
            this.checkShowAuthPop(res.errorCode);
            return new askAction.PostFailure({
              ..._,
              ...new ResponseError(res.errorCode, res.errorMessage)
            });
          }
        });
    });

  constructor(
    private _actions$: Actions,
    private _httpClient: HttpClient,
    private _snackBar: MatSnackBar,
    private _store: Store<any>,
    private _router: Router,
  ) { }

  /**
   * 根据错误码检查是否需要登录提示
   * @param errorCode 错误码
   */
  checkShowAuthPop(errorCode: ErrorCodeEnum = ErrorCodeEnum.AUTHORIZATION): void {
    if (errorCode === ErrorCodeEnum.AUTHORIZATION) {
      this._snackBar.open.apply(this._snackBar, NO_AUTH_POP_ALITER);
      this._store.dispatch(new authAction.ClearLogedUserState());
    }
  }
}
