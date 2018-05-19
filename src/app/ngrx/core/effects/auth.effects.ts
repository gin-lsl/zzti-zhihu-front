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
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { ResponseError, API, clearUserStorage } from '../../../utils/index';
import { parseUserStorage } from '../../../utils/functions/localstorage.function';

@Injectable()
export class AuthEffects {

  /**
   * 登录
   */
  @Effect()
  signIn$ = this._actions$
    .ofType(authAction.AuthActionTypesEnum.SignIn)
    .map((action: authAction.SignIn) => action.payload)
    .exhaustMap(_ => (
      this._authService
        .signIn(_.email, _.password, _.isAdmin)
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
    .ofType(authAction.AuthActionTypesEnum.SignOn)
    .map((action: authAction.SignOn) => action.payload)
    .exhaustMap(_ => (
      this._authService.signOn(_)
        .map(data => (
          data.success
            ? new authAction.SignOnSuccess(data.successResult)
            : new authAction.SignOnFailure(new ResponseError(data.errorCode, data.errorMessage))
        ))
        .catch((error: API) => Observable.of(new authAction.SignOnFailure(new ResponseError(error.errorCode, error.errorMessage))))
    ));

  /**
   * 登录成功
   */
  @Effect({ dispatch: false })  // 阻止继续分发事件
  signInSuccess$ = this._actions$
    .ofType(authAction.AuthActionTypesEnum.SignInSuccess)
    .do((_: any) => {
      console.log('登录成功后的导航: ', _);
      if (_ && _.payload && _.payload.isAdmin) {
        return this._router.navigate(['/admin']);
      }
      return this._router.navigate(['/']);
    });

  /**
   * 加载当前已登录用户的信息
   */
  @Effect()
  loadLogedUserInformation$ = this._actions$
    .ofType(authAction.AuthActionTypesEnum.LoadUserInformation)
    .map((action: authAction.LoadUserInformation) => action.payload)
    .exhaustMap(_ => (
      this._userService.loadLogedUserInformation()
        .map(data => (
          data != null && data.success
            ? new authAction.LoadUserInformationSuccess(data.successResult)
            : new authAction.LoadUserInformationFailure()
        ))
        .catch(() => Observable.of(new authAction.LoadUserInformationFailure()))
    ));

  /**
   * 初始化用户状态
   */
  @Effect()
  clearLogedUserState$ = this._actions$
    .ofType(authAction.AuthActionTypesEnum.ClearLogedUserState)
    .do(() => {
      clearUserStorage();
    })
    .exhaustMap(() => Observable.of(new authAction.ClearLogedUserStateSuccess()));

  // checkSignState$ = this._actions$
  //   .ofType(authAction.AuthActionTypes.CheckSignState)
  //   .exhaustMap(_ => {
  //     return;
  //   });

  constructor(
    private _router: Router,
    private _actions$: Actions,
    private _authService: AuthService,
    private _userService: UserService,
  ) { }
}
