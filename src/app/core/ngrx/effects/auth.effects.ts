import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/do';
import * as authAction from '../actions/auth.action';
import { SignService } from '../../services/sign.service';
import { UserService } from '../../services/user.service';
import { ResponseError, API } from '../../../utils/index';
import { parseUserStorage } from '../../../utils/functions/localstorage.function';

@Injectable()
export class AuthEffects {

  /**
   * 登录
   */
  @Effect()
  signIn$ = this._actions$
    .ofType(authAction.AuthActionTypes.SignIn)
    .map((action: authAction.SignIn) => action.payload)
    .exhaustMap(_ => (
      this._signService
        .signIn(_.email, _.password)
        .map(data => (
          data.success
            ? new authAction.SignInSuccess(data.successResult)
            : new authAction.SignInFailure(new ResponseError(data.errorCode, data.errorMessage))
        ))
        .catch((error: API) => Observable.of(new authAction.SignInFailure(new ResponseError(error.errorCode, error.errorMessage))))
    ));

  /**
   * 注册
   */
  @Effect()
  signOn$ = this._actions$
    .ofType(authAction.AuthActionTypes.SignOn)
    .map((action: authAction.SignOn) => action.payload)
    .exhaustMap(_ => (
      this._signService.signOn(_)
        .map(data => (
          data.success
            ? new authAction.SignOnSuccess(data.successResult.access_token)
            : new authAction.SignOnFailure(new ResponseError(data.errorCode, data.errorMessage))
        ))
        .catch((error: API) => Observable.of(new authAction.SignOnFailure(new ResponseError(error.errorCode, error.errorMessage))))
    ));

  /**
   * 登录成功
   */
  @Effect({ dispatch: false })  // 阻止继续分发事件
  signInSuccess$ = this._actions$
    .ofType(authAction.AuthActionTypes.SignInSuccess)
    .do(() => this._router.navigate(['/']));

  /**
   * 加载当前已登录用户的信息
   */
  @Effect()
  loadUserInformation$ = this._actions$
    .ofType(authAction.AuthActionTypes.LoadUserInformation)
    .map((action: authAction.LoadUserInformation) => action.payload)
    .exhaustMap(_ => (
      this._userService.loadUserInformation()
        .map(data => (
          data == null && data.success
            ? new authAction.LoadUserInformationSuccess(data.successResult)
            : new authAction.LoadUserInformationFailure()
        ))
        .catch(() => Observable.of(new authAction.LoadUserInformationFailure()))
    ));

  constructor(
    private _router: Router,
    private _actions$: Actions,
    private _signService: SignService,
    private _userService: UserService,
  ) { }
}
