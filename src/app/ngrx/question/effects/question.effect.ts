import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/exhaustMap';
import { Observable } from 'rxjs/Observable';
import * as questionAction from '../actions/question.action';
import * as authAction from '../../../ngrx/core/actions/auth.action';
import { API, ResponseError, parseUserStorage, ErrorCodeEnum, API_HOST, NO_AUTH_POP_ALITER } from '../../../utils/index';

@Injectable()
export class QuestionEffects {

  private readonly apiLoad: string = API_HOST + '/questions';

  private readonly apiUp: string = API_HOST + '/questions/up/';
  private readonly apiCancelUp: string = API_HOST + '/questions/cancel-up/';

  private readonly apiDown: string = API_HOST + '/questions/down/';
  private readonly apiCancelDown: string = API_HOST + '/questions/cancel-down/';

  private readonly apiLike: string = API_HOST + '/questions/like/';
  private readonly apiUnLike: string = API_HOST + '/questions/unlike/';

  /**
   * 加载多条问题信息
   */
  @Effect()
  loadMany$: Observable<Action> = this._actions$
    .ofType(questionAction.QuestionActionTypesEnum.Load)
    .map((action: questionAction.Load) => action.payload)
    .exhaustMap(_ => (
      this._httpClient
        .get(this.apiLoad)
        .map((data: API) => (
          data.success
            ? new questionAction.LoadSuccess(data.successResult)
            : new questionAction.LoadFailure(new ResponseError(data.errorCode, data.errorMessage))
        ))
        .catch((error) => Observable.of(new questionAction.LoadFailure(ResponseError.UNDEFINED_ERROR)))
    ));

  /**
   * 点赞
   */
  @Effect()
  up$: Observable<Action> = this._actions$
    .ofType(questionAction.QuestionActionTypesEnum.Up)
    .map((action: questionAction.Up) => action.payload)
    .exhaustMap(id => {
      const user = parseUserStorage();
      if (!user) {
        this.checkShowAuthPop();
        return Observable.empty();
      }
      return this._httpClient
        .get(this.apiUp + id, {
          headers: new HttpHeaders().append('Authorization', user.access_token)
        })
        .map((data: API) => {
          if (data.success) {
            return new questionAction.UpSuccess(id, user.id);
          } else {
            this.checkShowAuthPop(data.errorCode);
            return new questionAction.CancelUpFailure(new ResponseError(data.errorCode, data.errorMessage));
          }
        })
        .catch((error) => Observable.of(new questionAction.UpFailure(ResponseError.UNDEFINED_ERROR)));
    });

  /**
   * 取消点赞
   */
  @Effect()
  cancelUp$: Observable<Action> = this._actions$
    .ofType(questionAction.QuestionActionTypesEnum.CancelUp)
    .map((action: questionAction.CancelUp) => action.payload)
    .exhaustMap(id => {
      const user = parseUserStorage();
      if (!user) {
        this.checkShowAuthPop();
        return Observable.empty();
      }
      return this._httpClient
        .get(this.apiCancelUp + id, {
          headers: new HttpHeaders().append('Authorization', user.access_token)
        })
        .map((data: API) => {
          if (data.success) {
            return new questionAction.CancelUpSuccess(id, user.id);
          } else {
            this.checkShowAuthPop(data.errorCode);
            return new questionAction.CancelUpFailure(new ResponseError(data.errorCode, data.errorMessage));
          }
        })
        .catch(error => Observable.of(new questionAction.CancelUpFailure(ResponseError.UNDEFINED_ERROR)));
    });


  /**
   * 反对
   */
  @Effect()
  down$: Observable<Action> = this._actions$
    .ofType(questionAction.QuestionActionTypesEnum.Down)
    .map((action: questionAction.Down) => action.payload)
    .exhaustMap(id => {
      const user = parseUserStorage();
      if (!user) {
        this.checkShowAuthPop();
        return Observable.empty();
      }
      return this._httpClient
        .get(this.apiDown + id, {
          headers: new HttpHeaders().append('Authorization', user.access_token)
        })
        .map((data: API) => {
          if (data.success) {
            return new questionAction.DownSuccess(id, user.id);
          } else {
            this.checkShowAuthPop(data.errorCode);
            return new questionAction.CancelDownFailure(new ResponseError(data.errorCode, data.errorMessage));
          }
        })
        .catch((error) => Observable.of(new questionAction.DownFailure(ResponseError.UNDEFINED_ERROR)));
    });

  /**
   * 取消反对
   */
  @Effect()
  cancelDown$: Observable<Action> = this._actions$
    .ofType(questionAction.QuestionActionTypesEnum.CancelDown)
    .map((action: questionAction.CancelDown) => action.payload)
    .exhaustMap(id => {
      const user = parseUserStorage();
      if (!user) {
        this.checkShowAuthPop();
        return Observable.empty();
      }
      return this._httpClient
        .get(this.apiCancelDown + id, {
          headers: new HttpHeaders().append('Authorization', user.access_token)
        })
        .map((data: API) => {
          if (data.success) {
            return new questionAction.CancelDownSuccess(id, user.id);
          } else {
            this.checkShowAuthPop(data.errorCode);
            return new questionAction.CancelDownFailure(new ResponseError(data.errorCode, data.errorMessage));
          }
        })
        .catch(error => Observable.of(new questionAction.CancelDownFailure(ResponseError.UNDEFINED_ERROR)));
    });


  /**
   * 收藏
   */
  @Effect()
  like$: Observable<Action> = this._actions$
    .ofType(questionAction.QuestionActionTypesEnum.Like)
    .map((action: questionAction.Like) => action.payload)
    .exhaustMap(id => {
      const user = parseUserStorage();
      if (!user) {
        this.checkShowAuthPop();
        return Observable.empty();
      }
      return this._httpClient
        .get(this.apiLike + id, {
          headers: new HttpHeaders().append('Authorization', user.access_token)
        })
        .map((data: API) => {
          if (data.success) {
            return new questionAction.LikeSuccess(id, user.id);
          } else {
            this.checkShowAuthPop(data.errorCode);
            return new questionAction.LikeFailure(new ResponseError(data.errorCode, data.errorMessage));
          }
        })
        .catch(error => Observable.of(new questionAction.LikeFailure(ResponseError.UNDEFINED_ERROR)));
    });

  /**
   * 取消收藏
   */
  @Effect()
  unLike$: Observable<Action> = this._actions$
    .ofType(questionAction.QuestionActionTypesEnum.UnLike)
    .map((action: questionAction.UnLike) => action.payload)
    .exhaustMap(id => {
      const user = parseUserStorage();
      if (!user) {
        this.checkShowAuthPop();
        return Observable.empty();
      }
      return this._httpClient
        .get(this.apiUnLike + id, {
          headers: new HttpHeaders().append('Authorization', user.access_token)
        })
        .map((data: API) => {
          if (data.success) {
            return new questionAction.UnLikeSuccess(id, user.id);
          } else {
            this.checkShowAuthPop(data.errorCode);
            return new questionAction.UnLikeFailure(new ResponseError(data.errorCode, data.errorMessage));
          }
        })
        .catch(error => Observable.of(new questionAction.UnLikeFailure(ResponseError.UNDEFINED_ERROR)));
    });

  /**
   * 加载某个问题信息
   */
  @Effect()
  loadOne$: Observable<Action> = this._actions$
    .ofType(questionAction.QuestionActionTypesEnum.LoadOne)
    .map((action: questionAction.LoadOne) => action.payload)
    .exhaustMap(payload => {
      const user = parseUserStorage();
      const headers = new HttpHeaders();
      if (user) {
        headers.append('Authorization', user.access_token);
      }
      return this._httpClient.get(`${this.apiLoad}/${payload.questionId}`, { headers })
        .map((data: API) => {
          if (data.success) {
            if (payload.isWannaNativateTo) {
              this._router.navigateByUrl('/question/' + payload.questionId);
            }
            return new questionAction.LoadOneSuccess(data.successResult);
          } else {
            return new questionAction.LoadOneFailure(new ResponseError(data.errorCode, data.errorMessage));
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
