import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/exhaustMap';
import * as authAction from '../actions/auth.action';
import { SignService } from '../../services/sign.service';
import { ResponseError, API } from '../../../utils/index';

@Injectable()
export class AuthEffects {

  /**
   * 登录
   */
  @Effect()
  signIn$ = this.actions$
    .ofType(authAction.AuthActionTypes.SignIn)
    .map((action: authAction.SignIn) => action.payload)
    .exhaustMap(_ => (
      this.signService
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
  signOn$ = this.actions$
    .ofType(authAction.AuthActionTypes.SignOn)
    .map((action: authAction.SignOn) => action.payload)
    .exhaustMap(_ => (
      this.signService.signOn(_)
        .map(data => (
          data.success
            ? new authAction.SignOnSuccess(data.successResult.access_token)
            : new authAction.SignOnFailure(new ResponseError(data.errorCode, data.errorMessage))
        ))
        .catch((error: API) => Observable.of(new authAction.SignOnFailure(new ResponseError(error.errorCode, error.errorMessage))))
    ));

  constructor(
    private actions$: Actions,
    private signService: SignService,
  ) { }
}
