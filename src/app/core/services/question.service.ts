import { Injectable } from '@angular/core';
import { API_HOST, API, parseUserStorage, ErrorCodeEnum } from '../../utils/index';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

// @Injectable()
export class QuestionService {

  private readonly apiLoad: string = API_HOST + '/questions';

  private readonly apiUp: string = API_HOST + '/questions/up';

  private readonly apiCancelUp: string = API_HOST + '/questions/cancel-up';

  private readonly apiLike: string = API_HOST + '/questions/like';

  private readonly apiUnLike: string = API_HOST + '/questions/unlike';

  constructor(
    private _httpClient: HttpClient,
    private _snackBar: MatSnackBar,
  ) { }


  public load(): Observable<API<any>> {

    return this._httpClient.get(this.apiLoad) as Observable<API<any>>;
  }

  public up(id: string): Observable<API<any> | null> {

    const user = parseUserStorage();

    if (!user) {
      this.checkShowAuthPop();
      return Observable.empty();
    }

    return this._httpClient
      .get(`${this.apiUp}/${id}`, {
        headers: new HttpHeaders().append('Authorization', user.access_token)
      }) as Observable<API<any>>;
  }

  /**
   * 根据错误码检查是否需要登录提示
   * @param errorCode 错误码
   */
  checkShowAuthPop(errorCode: ErrorCodeEnum = ErrorCodeEnum.AUTHORIZATION): void {
    // if (errorCode === ErrorCodeEnum.AUTHORIZATION) {
    //   this._snackBar.open.apply(this._snackBar, NO_AUTH_POP_ALITER);
    //   this._store.dispatch(new authAction.ClearLogedUserState());
    // }
  }

}
