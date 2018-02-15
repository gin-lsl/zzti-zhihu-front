import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as replyAction from '../actions/reply.action';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_HOST, parseUserStorage, API, ResponseError } from '../../../utils/index';

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
  ) { }
}
