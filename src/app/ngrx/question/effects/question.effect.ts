import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
import { HttpService } from '../../../core/services/http.service';

@Injectable()
export class QuestionEffects {

  private readonly apiLoad: string = '/questions';
  private readonly apiRelate: string = API_HOST + '/questions/relate';

  private readonly apiUp: string = API_HOST + '/questions/up/';
  private readonly apiCancelUp: string = API_HOST + '/questions/cancel-up/';

  private readonly apiDown: string = API_HOST + '/questions/down/';
  private readonly apiCancelDown: string = API_HOST + '/questions/cancel-down/';

  private readonly apiLike: string = API_HOST + '/questions/like/';
  private readonly apiUnLike: string = API_HOST + '/questions/unlike/';

  private readonly apiSearch: string = API_HOST + '/questions/search';

  /**
   * 加载多条问题信息
   */
  @Effect()
  LoadMany$: Observable<Action> = this._actions$
    .ofType(questionAction.QuestionActionTypesEnum.Load)
    .map((action: questionAction.Load) => action.payload as string)
    .exhaustMap(_ => (
      // this._httpClient
      //   .get<API>(this.apiLoad, {
      //     params: new HttpParams().append('count', _)
      //   })
      //   .map(data => (
      //     data.success
      //       ? new questionAction.LoadSuccess(data.successResult)
      //       : new questionAction.LoadFailure(new ResponseError(data.errorCode, data.errorMessage))
      //   ))
      //   .catch(error => Observable.of(new questionAction.LoadFailure(ResponseError.UNDEFINED_ERROR)))
      // this._httpService
      //   .curringGet(this.apiLoad, new HttpParams().append('count', _))(questionAction.LoadSuccess, questionAction.LoadFailure)
      this._httpService
        .get(this.apiLoad, new HttpParams().append('count', _), questionAction.LoadSuccess, questionAction.LoadFailure)
    ));

  /**
   * 加载跟此问题相似的问题
   */
  @Effect()
  LoadRelates$: Observable<Action> = this._actions$
    .ofType(questionAction.QuestionActionTypesEnum.LoadRelates)
    .map((action: questionAction.LoadRelates) => action.payload)
    .exhaustMap(_ => (
      this._httpClient
        .get<API>(this.apiRelate, {
          params: new HttpParams().append('excludeId', _.excludeId).append('like', _.like)
        })
        .map(data => (
          data.success
            ? new questionAction.LoadRelatesSuccess(data.successResult)
            : new questionAction.LoadRelatesFailure(new ResponseError(data.errorCode, data.errorMessage))
        ))
        .catch(error => Observable.of(new questionAction.LoadRelatesFailure(ResponseError.UNDEFINED_ERROR)))
    ));

  /**
   * 点赞
   */
  @Effect()
  Up$: Observable<Action> = this._actions$
    .ofType(questionAction.QuestionActionTypesEnum.Up)
    .map((action: questionAction.Up) => action.payload)
    .exhaustMap(id => {
      // return this._httpService.get(this.apiUp + id, null, questionAction.UpSuccess, questionAction.UpFailure);
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
            return new questionAction.UpFailure(new ResponseError(data.errorCode, data.errorMessage));
          }
        })
        .catch((error) => Observable.of(new questionAction.UpFailure(ResponseError.UNDEFINED_ERROR)));
    });

  /**
   * 取消点赞
   */
  @Effect()
  CancelUp$: Observable<Action> = this._actions$
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
  Down$: Observable<Action> = this._actions$
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
  CancelDown$: Observable<Action> = this._actions$
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
  Like$: Observable<Action> = this._actions$
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
  UnLike$: Observable<Action> = this._actions$
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
  LoadOne$: Observable<Action> = this._actions$
    .ofType(questionAction.QuestionActionTypesEnum.LoadOne)
    .map((action: questionAction.LoadOne) => action.payload)
    .exhaustMap(payload => {
      const user = parseUserStorage();
      const headers = new HttpHeaders();
      if (user) {
        headers.append('Authorization', user.access_token);
      }
      return this._httpClient.get(API_HOST + `${this.apiLoad}/${payload.questionId}`, { headers })
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

  /**
   * 搜索
   */
  @Effect()
  Search$: Observable<Action> = this._actions$
    .ofType(questionAction.QuestionActionTypesEnum.Search)
    .map((action: questionAction.Search) => action.payload)
    .exhaustMap(text => {
      if (text.trim() === '') {
        return Observable.of(new questionAction.SearchSuccess([]));
      }
      return this._httpClient
        .get<API>(this.apiSearch, {
          params: new HttpParams().append('search', text)
        })
        .map(data => (
          data.success
            ? new questionAction.SearchSuccess(data.successResult)
            : new questionAction.SearchFailure(new ResponseError(data.errorCode, data.errorMessage))
        ));
    });

  constructor(
    private _actions$: Actions,
    private _httpClient: HttpClient,
    private _snackBar: MatSnackBar,
    private _store: Store<any>,
    private _router: Router,
    private _httpService: HttpService,
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
