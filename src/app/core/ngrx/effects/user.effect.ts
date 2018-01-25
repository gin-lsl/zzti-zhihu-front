import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import * as userAction from '../actions/user.action';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { UserService } from '../../../core/services/user.service';
import { ResponseError, API } from '../../../utils/index';

@Injectable()
export class UserEffects {

  /**
   * 加载某用户信息
   */
  @Effect()
  public loadUserInformationByUserId$ = this._actions$
    .ofType(userAction.UserActionTypesEnum.Load)
    .map((action: userAction.Load) => action.payload)
    .exhaustMap(_ => (
      this._userService.loadPlainUserInformation(_)
        .map(data => (
          data.success
            ? new userAction.LoadSuccess(data.successResult)
            : new userAction.LoadFailure(new ResponseError(data.errorCode, data.errorMessage))
        ))
        .catch((error: API) => Observable.of(new userAction.LoadFailure(new ResponseError(error.errorCode, error.errorMessage))))
    ));

  constructor(
    private _actions$: Actions,
    private _userService: UserService,
  ) { }
}
