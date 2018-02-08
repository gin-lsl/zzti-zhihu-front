import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as userAction from '../actions/user.action';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_HOST, parseUserStorage, API, ResponseError } from '../../../utils/index';

@Injectable()
export class UserEffects {

  private readonly apiUserInfo: string = API_HOST + '/user/';

  /**
   * 加载用户数据
   */
  @Effect()
  load$: Observable<Action> = this._actions$
    .ofType(userAction.UserActionTypesEnum.Load)
    .map((action: userAction.Load) => action.payload)
    .exhaustMap(userId => {
      const user = parseUserStorage();
      const headers = new HttpHeaders();
      if (user) {
        headers.append('Authorization', user.access_token);
      }
      return this._httpClient.get(this.apiUserInfo, { headers })
        .map((res: API) => {
          if (res.success) {
            return new userAction.LoadSuccess(res.successResult);
          } else {
            return new userAction.LoadFailure(new ResponseError(res.errorCode, res.errorMessage));
          }
        });
    });

  constructor(
    private _actions$: Actions,
    private _httpClient: HttpClient,
  ) { }
}
