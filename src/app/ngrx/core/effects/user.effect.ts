import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import * as userAction from '../actions/user.action';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { UserService } from '../../../core/services/user.service';
import { ResponseError, API, API_HOST, parseUserStorage, ErrorCodeEnum, NO_AUTH_POP_ALITER } from '../../../utils/index';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Store, Action } from '@ngrx/store';
import * as authAction from '../actions/auth.action';

@Injectable()
export class UserEffects {

  private readonly apiUserInformation: string = API_HOST + '/users/';

  private readonly apiFollowUser: string = API_HOST + '/users/follow/';

  private readonly apiCancelFollowUser: string = API_HOST + '/users/cancel-follow/';

  /**
   * 加载某用户信息
   */
  @Effect()
  public loadUserInformationByUserId$ = this._actions$
    .ofType(userAction.UserActionTypesEnum.Load)
    .map((action: userAction.Load) => action.payload)
    .exhaustMap(_ => {
      const user = parseUserStorage();
      let headers = new HttpHeaders();
      if (user) {
        headers = headers.append('Authorization', user.access_token);
      }
      // this._userService.loadPlainUserInformation(_)
      return this._httpClient
        .get(this.apiUserInformation + _, { headers })
        .map((data: API) => (
          data.success
            ? new userAction.LoadSuccess(data.successResult)
            : new userAction.LoadFailure(new ResponseError(data.errorCode, data.errorMessage))
        ))
        .catch((error: API) => {
          console.log(error);
          return Observable.of(new userAction.LoadFailure(new ResponseError(error.errorCode, error.errorMessage)));
        });
    });

  /**
   * 关注用户
   */
  @Effect()
  Follow$: Observable<Action> = this._actions$
    .ofType(userAction.UserActionTypesEnum.Follow)
    .map((action: userAction.Follow) => action.payload)
    .exhaustMap(id => {
      const user = parseUserStorage();
      if (!user) {
        this.checkShowAuthPop();
        return Observable.empty();
      }
      return this._httpClient
        .get(this.apiFollowUser + id, {
          headers: new HttpHeaders().append('Authorization', user.access_token)
        })
        .map((data: API) => {
          if (data.success) {
            return new userAction.FollowSuccess(data.successResult);
          } else {
            return new userAction.FollowFailure(new ResponseError(data.errorCode, data.errorMessage));
          }
        });
    });

  /**
   * 取消关注
   */
  @Effect()
  CancelFollow$: Observable<Action> = this._actions$
    .ofType(userAction.UserActionTypesEnum.CancelFollow)
    .map((action: userAction.CancelFollow) => action.payload)
    .exhaustMap(id => {
      const user = parseUserStorage();
      if (!user) {
        this.checkShowAuthPop();
        return Observable.empty();
      }
      return this._httpClient
        .get(this.apiCancelFollowUser + id, {
          headers: new HttpHeaders().append('Authorization', user.access_token)
        })
        .map((data: API) => {
          if (data.success) {
            return new userAction.CancelFollowSuccess(data.successResult);
          } else {
            return new userAction.CancelFollowFailure(new ResponseError(data.errorCode, data.errorMessage));
          }
        });
    });

  constructor(
    private _actions$: Actions,
    private _httpClient: HttpClient,
    // private _userService: UserService,
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
