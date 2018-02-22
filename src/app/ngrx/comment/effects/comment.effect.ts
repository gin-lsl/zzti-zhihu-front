import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as commentAction from '../actions/comment.action';
import * as authAction from '../../core/actions/auth.action';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_HOST, API, ResponseError, parseUserStorage, ErrorCodeEnum, NO_AUTH_POP_ALITER } from '../../../utils/index';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class CommentEffects {

  private readonly apiLoad: string = API_HOST + '/comments/';

  /**
   * 加载评论信息
   */
  @Effect()
  Load$: Observable<Action> = this._actions$
    .ofType(commentAction.CommentActionTypesEnum.Load)
    .exhaustMap((action: commentAction.Load) => (
      this._httpClient
        .get(this.apiLoad + action.payload)
        .map((res: API) => (
          res.success
            ? new commentAction.LoadSuccess(res.successResult)
            : new commentAction.LoadFailure(new ResponseError(res.errorCode, res.errorMessage))
        ))
    ));

  /**
   * 提交评论信息
   */
  @Effect()
  Post$: Observable<Action> = this._actions$
    .ofType(commentAction.CommentActionTypesEnum.Post)
    .exhaustMap((action: commentAction.Post) => {
      const user = parseUserStorage();
      if (!user) {
        this.checkShowAuthPop();
        return Observable.empty();
      }
      return this._httpClient
        .post(this.apiPostCommentFn(action.payload.questionId, action.payload.replyId), action.payload,
        { headers: new HttpHeaders().append('Authorization', user.access_token) })
        .map((res: API) => (
          res.success
            ? new commentAction.PostSuccess(res.successResult)
            : new commentAction.PostFailure(new ResponseError(res.errorCode, res.errorMessage))
        ));
    });

  constructor(
    private _actions$: Actions,
    private _httpClient: HttpClient,
    private _store: Store<any>,
    private _snackBar: MatSnackBar,
  ) { }

  private apiPostCommentFn = (questionId: string, replyId: string): string => {
    return (API_HOST + `/comments/q/${questionId}`) + (replyId ? `/r/${replyId}` : '');
  }

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
