import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { API, AccessToken, ISignIn } from '../../utils/index';
import { UserService } from './user.service';

@Injectable()
export class SignService {

  constructor(
    private _httpClient: HttpClient,
    private _userService: UserService,
  ) { }

  /**
   * 登录
   *
   * 如果登录成功,则会把 `access_token` 和 `signed_user_id` 放在 `sessionStorage`
   *
   * @param email 邮箱
   * @param password 密码
   */
  public signIn(email: string, password: string): Observable<API<ISignIn>> {
    return (this._httpClient.post('http://localhost:3000/users/signin', { email, password }) as Observable<API<ISignIn>>)
      // 保存到 sessionStorage
      .do(p => {
        // p.success &&

        if (p.success) {
          this._userService.user$$.next(p.successResult);
          sessionStorage.setItem('access_token', p.successResult.access_token);
          sessionStorage.setItem('signed_user_id', p.successResult.id);
        }
      });
  }

}
