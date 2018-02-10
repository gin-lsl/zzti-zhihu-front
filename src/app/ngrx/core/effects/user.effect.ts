import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import * as userAction from '../actions/user.action';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { UserService } from '../../../core/services/user.service';
import { ResponseError, API, API_HOST, parseUserStorage } from '../../../utils/index';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserEffects {

  private readonly apiUserInformation: string = API_HOST + '/users/';

  /**
   * 加载某用户信息
   */
  @Effect()
  public loadUserInformationByUserId$ = this._actions$
    .ofType(userAction.UserActionTypesEnum.Load)
    .map((action: userAction.Load) => action.payload)
    .exhaustMap(_ => {
      const user = parseUserStorage();
      const headers = new HttpHeaders();
      if (user) {
        headers.append('Authorization', user.access_token);
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
          return Observable.of(new userAction.LoadFailure(new ResponseError(error.errorCode, error.errorMessage)))
        });
    });

  constructor(
    private _actions$: Actions,
    private _httpClient: HttpClient,
    // private _userService: UserService,
  ) { }
}
