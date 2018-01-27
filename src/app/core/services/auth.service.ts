import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { API, ISignIn, User, API_HOST } from '../../utils/index';

@Injectable()
export class AuthService {

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

    return (this._httpClient.post(this.apiSignIn, { email, password }) as Observable<API<ISignIn | User>>);
  }

  /**
   * 注册
   *
   * @param email 邮箱
   */
  public signOn(email: string): Observable<API<ISignIn | User>> {

    return (this._httpClient.post(this.apiSignOn, { email }) as Observable<API<ISignIn | User>>);
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

}
