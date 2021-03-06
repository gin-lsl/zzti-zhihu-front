import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as messageAction from '../actions/message.action';
import * as authAction from '../../core/actions/auth.action';
import { API_HOST, API, ResponseError, parseUserStorage, ErrorCodeEnum, NO_AUTH_POP_ALITER } from '../../../utils';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class MessageEffects {

  private readonly apiLoad: string = API_HOST + '/messages';

  private readonly apiRemove: string = API_HOST + '/messages/';

  /**
   * 加载消息
   */
  @Effect()
  Load$: Observable<Action> = this._actions$
    .ofType(messageAction.MessageActionTypesEnum.Load)
    // .map((action: messageAction.Load) => action.payload as any)
    .exhaustMap(_ => {
      console.log('messages');
      const user = parseUserStorage();
      let headers = new HttpHeaders();
      if (user) {
        headers = headers.append('Authorization', user.access_token);
      }
      return this._httpClient
        .get<API>(this.apiLoad, { headers })
        .map(data => (
          data.success
            ? new messageAction.LoadSuccess(data.successResult)
            : new messageAction.LoadFailure(new ResponseError(data.errorCode, data.errorMessage))
        ));
    })
    .catch(error => Observable.of(new messageAction.LoadFailure(ResponseError.UNDEFINED_ERROR)));

  @Effect()
  Remove$: Observable<Action> = this._actions$.ofType(messageAction.MessageActionTypesEnum.Remove)
    .map((action: messageAction.Remove) => action.payload)
    .exhaustMap(_ => {
      const user = parseUserStorage();
      let headers = new HttpHeaders();
      if (user) {
        headers = headers.append('Authorization', user.access_token);
      }
      return this._httpClient.delete<API>(this.apiRemove + _, { headers })
        .map(data => (
          data.success
            ? new messageAction.RemoveSuccess(_)
            : new messageAction.RemoveFailure(new ResponseError(data.errorCode, data.errorMessage))
        ));
    })
    .catch(error => Observable.of(new messageAction.RemoveFailure(ResponseError.UNDEFINED_ERROR)));

  @Effect()
  Clear$: Observable<Action> = this._actions$.ofType(messageAction.MessageActionTypesEnum.Clear)
    .exhaustMap(_ => {
      const user = parseUserStorage();
      let headers = new HttpHeaders();
      if (user) {
        headers = headers.append('Authorization', user.access_token);
      }
      return this._httpClient.delete<API>(this.apiRemove, { headers })
        .map(data => (
          data.success
            ? new messageAction.ClearSuccess()
            : new messageAction.ClearFailure(new ResponseError(data.errorCode, data.errorMessage))
        ));
    })
    .catch(error => Observable.of(new messageAction.ClearFailure(ResponseError.UNDEFINED_ERROR)));

  constructor(
    private _actions$: Actions,
    private _httpClient: HttpClient,
    private _snackBar: MatSnackBar,
    private _store: Store<any>,
  ) { }

  checkShowAuthPop(errorCode: ErrorCodeEnum = ErrorCodeEnum.AUTHORIZATION): void {
    if (errorCode === ErrorCodeEnum.AUTHORIZATION) {
      this._snackBar.open.apply(this._snackBar, NO_AUTH_POP_ALITER);
      this._store.dispatch(new authAction.ClearLogedUserState());
    }
  }
}
