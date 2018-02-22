import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material';
import * as replyAction from '../actions/reply.action';
import * as authAction from '../../core/actions/auth.action';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_HOST, parseUserStorage, API, ResponseError, ErrorCodeEnum, NO_AUTH_POP_ALITER } from '../../../utils/index';

@Injectable()
export class ReplyEffects {

  private readonly apiPostReply: string = API_HOST + '/replies/';

  private readonly apiLoadReply: string = API_HOST + '/replies/q/';

  /**
   * 加载回复信息
   */
  @Effect()
  Load$: Observable<Action> = this._actions$
    .ofType(replyAction.ReplyActionTypesEnum.Load)
    .exhaustMap((action: replyAction.Load) => {
      const user = parseUserStorage();
      const headers = new HttpHeaders();
      if (user) {
        headers.append('Authorization', user.access_token);
      }
      return this._httpClient
        .get(this.apiLoadReply + action.payload, { headers })
        .map((res: API) => (
          res.success
            ? new replyAction.LoadSuccess({ replies: res.successResult, questionId: action.payload })
            : new replyAction.LoadFailure(new ResponseError(res.errorCode, res.errorMessage))
        ));
    });

  /**
   * 提交回复信息
   */
  @Effect()
  Post$: Observable<Action> = this._actions$
    .ofType(replyAction.ReplyActionTypesEnum.Post)
    .exhaustMap((action: replyAction.Post) => {
      const user = parseUserStorage();
      if (!user) {
        this.checkShowAuthPop();
        return Observable.empty();
      }
      return this._httpClient
        .post(this.apiPostReply + action.payload.questionId, action.payload, {
          headers: new HttpHeaders().append('Authorization', user.access_token)
        })
        .map((res: API) => (
          res.success
            ? new replyAction.PostSuccess(res.successResult)
            : new replyAction.PostFailure(new ResponseError(res.errorCode, res.errorMessage))
        ));
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
      this._snackBar.open.apply(this._snackBar, NO_AUTH_POP_ALITER);
      this._store.dispatch(new authAction.ClearLogedUserState());
    }
  }
}
