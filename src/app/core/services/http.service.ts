import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpHandler } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { parseUserStorage, ErrorCodeEnum, NO_AUTH_POP_ALITER, ResponseError, API, API_HOST } from '../../utils';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { Store, Action } from '@ngrx/store';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Subscribable } from 'rxjs/Observable';

@Injectable()
export class HttpService {

  constructor(
    private _httpClient: HttpClient,
    private _matSnackBar: MatSnackBar,
    private _store: Store<any>,
  ) { }

  /**
   * GET请求
   * @param url url
   * @param params params
   */
  public curringGet(url: string, params?: HttpParams | {
    [key: string]: string | string[]
  }) {
    /**
     * @param actionSuccess 成功
     * @param actionFailure 失败
     */
    return (actionSuccess: any, actionFailure: any) => {
      const headers = this.getAuthorizationHeaders();
      return this._httpClient
        .get(this.formatUrl(url), { params, headers })
        .map(this.handleResponseData(actionSuccess, actionFailure))
        .catch(this.handleResponseError(actionFailure));
    };
  }

  /**
   * GET 请求
   *
   * @param url 请求地址, 有无 `API_HOST` 和 `/` 前缀都可以, 会自动判断并添加
   * @param params 参数
   */
  public get<T = any>(
    url: string,
    params?: HttpParams,
    actionSuccess?: Action & any,
    actionFailure?: Action & any): Observable<ResponseError & Action & T> {

    const headers = this.getAuthorizationHeaders();
    return this._httpClient
      .get<API<T>>(this.formatUrl(url), { params, headers })
      .map(this.handleResponseData<T>(actionSuccess, actionFailure))
      .catch(this.handleResponseError<T>(actionFailure));
  }

  /**
   * POST 请求
   *
   * @param url 请求地址, 有无 `API_HOST` 和 `/` 前缀都可以, 会自动判断并添加
   * @param body 请求体
   */
  public post<T = any>(
    url: string,
    body: any,
    actionSuccess?: Action & any,
    actionFailure?: Action & any): Observable<ResponseError & Action & T> {

    const headers = this.getAuthorizationHeaders();
    return this._httpClient
      .post<API<T>>(this.formatUrl(url), body, { headers })
      .map(this.handleResponseData<T>(actionSuccess, actionFailure))
      .catch(this.handleResponseError<T>(actionFailure));
  }

  /**
   * 获取有权限字段的请求头对象
   */
  private getAuthorizationHeaders(): HttpHeaders {
    const user = parseUserStorage();
    const headers = new HttpHeaders();
    if (user) {
      return headers.append('Authorization', user.access_token);
    }
    return headers;
  }

  /**
   * 处理响应数据
   *
   * @param actionSuccess 成功对象
   * @param actionFailure 失败对象
   */
  private handleResponseData<T = any>(
    actionSuccess?: any,
    actionFailure?: any): (value: API<T>, index: number) => Action | ResponseError {
    return res => {
      const success = res.success;
      const result = success ? res.successResult : new ResponseError(res.errorCode, res.errorMessage);
      if (!success && res.errorCode === ErrorCodeEnum.AUTHORIZATION) {
        this.showAuthPop();
      }
      if (success) {
        return actionSuccess ? new actionSuccess(result) : result;
      } else {
        return actionFailure ? new actionFailure(result) : result;
      }
    };
  }

  /**
   * 处理错误异常
   *
   * @param action 响应的动作
   */
  private handleResponseError<T = any>(actionFailure?: any): (err: any) => Observable<any> {
    return error => {
      if (error == null || error.errorCode == null) {
        error = ResponseError.UNDEFINED_ERROR;
      }
      if (error && error.errorCode === ErrorCodeEnum.AUTHORIZATION) {
        this.showAuthPop();
      }
      return Observable.of(actionFailure ? new actionFailure(error) : error);
    };
  }

  /**
   * 格式化请求路径
   *
   * @param url 请求路径
   */
  private formatUrl(url: string): string {
    if (!url.startsWith(API_HOST)) {
      if (!url.startsWith('/')) {
        url = '/' + url;
      }
      url = API_HOST + url;
    }
    return url;
  }

  /**
   * 显示权限提示
   */
  private showAuthPop(): void {
    this._matSnackBar.open.apply(this._matSnackBar, NO_AUTH_POP_ALITER);
  }

}
