import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { UserService } from './user.service';
import { API, AccessToken, ISignIn, ACCESS_TOKEN, SIGNED_USER_ID, SIGNED_USER_EMAIL, User, API_HOST } from '../../utils/index';

@Injectable()
export class SignService {

  /** 登录请求接口 */
  private readonly apiSignIn: string = API_HOST + '/users/signin';

  /** 注册请求接口 */
  private readonly apiSignOn: string = API_HOST + '/users/signon';

  /** 激活账户 */
  private readonly apiActiveAcount: string = API_HOST + '/users/active';

  constructor(
    private _httpClient: HttpClient,
    private _userService: UserService,
  ) { }

  /**
   * 登录
   *
   * @param email 邮箱
   * @param password 密码
   */
  public signIn(email: string, password: string): Observable<API<ISignIn | User>> {

    return (this._httpClient.post(this.apiSignIn, { email, password }) as Observable<API<ISignIn | User>>)
      // 保存到 `localStorage`
      .do(p => {
        if (p.success) {
          console.log('p: ', p);
          this.cacheUserStorage(p.successResult);
        }
      });
  }

  /**
   * 注册
   *
   * @param email 邮箱
   */
  public signOn(email: string): Observable<API<ISignIn | User>> {

    return (this._httpClient.post(this.apiSignOn, { email }) as Observable<API<ISignIn | User>>)
      // 保存到 `localStorage`
      .do(p => {
        console.log('p: ', p);
      });
  }

  /**
   * 激活账户
   *
   * @param key key
   */
  public activeAcount(key: string): Observable<API<any>> {

    const params = new HttpParams().append('key', key);
    return (this._httpClient.get(this.apiActiveAcount, { params }) as Observable<API<any>>);
  }

  /**
   * 缓存用户信息到 `localStorage`
   */
  public cacheUserStorage(user: ISignIn | User): void {

    if (!user || !user.id || !user.access_token || !user.email) {
      this._userService.user$$.next(null);
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(SIGNED_USER_ID);
      localStorage.removeItem(SIGNED_USER_EMAIL);
      return;
    }
    this._userService.user$$.next(user);
    localStorage.setItem(SIGNED_USER_ID, user.id);
    localStorage.setItem(SIGNED_USER_EMAIL, user.email);
    localStorage.setItem(ACCESS_TOKEN, user.access_token);
  }

}
