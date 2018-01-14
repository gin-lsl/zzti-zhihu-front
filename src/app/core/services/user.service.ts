import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { ISignIn, ACCESS_TOKEN, SIGNED_USER_ID, SIGNED_USER_EMAIL, User, API_HOST, API } from '../../utils/index';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  /**
   * 用户信息 `BehaviorSubject` 流, 订阅之后可以获取当前用户最新数据
   */
  public user$$: BehaviorSubject<ISignIn | User> = new BehaviorSubject<ISignIn | User>(null);

  /**
   * 登录用户的用户信息
   */
  public signedUser: ISignIn | User;

  private readonly apiInitUser: string = API_HOST + '/users/init';

  constructor(
    private _httpClient: HttpClient,
  ) { }

  /**
   * 订阅最新的用户信息数据, 过滤了空值
   *
   * @param next nextCallback
   * @param error errorCallback
   * @param complete completeCallback
   */
  public subscribeUser$$(next?: (value: ISignIn | User) => void, error?: (error: any) => void, complete?: () => void): Subscription {

    return this.user$$.filter(p => p !== null).subscribe(next, error, complete);
  }

  /**
   * 订阅最新的用户信息数据, 没有过滤空值, 需要自己判断
   *
   * @param next nextCallback
   * @param error errorCallback
   * @param complete completeCallback
   */
  public subscribeUserWhatever$$(
    next?: (value: ISignIn | User) => void,
    error?: (error: any) => void,
    complete?: () => void
  ): Subscription {

    return this.user$$.subscribe(next, error, complete);
  }

  /**
   * 检查是否有用户信息缓存
   *
   * 会触发 user$$ 推送更新用户数据
   */
  public checkUserCache(): boolean {

    const access_token = localStorage.getItem(ACCESS_TOKEN);
    const id = localStorage.getItem(SIGNED_USER_ID);
    const email = localStorage.getItem(SIGNED_USER_EMAIL);

    if (isNullOrUndefined(access_token) || isNullOrUndefined(id) || isNullOrUndefined(email)) {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(SIGNED_USER_ID);
      localStorage.removeItem(SIGNED_USER_EMAIL);
      this.user$$.next(null);
      return false;
    }
    this.user$$.next({ id, email, access_token });
    return true;
  }

  /**
   * 初始化用户信息
   *
   * @param user 用户信息
   */
  public initUser(user: any): Observable<API<any>> {
    return this._httpClient.post(this.apiInitUser, user) as Observable<API<any>>;
  }

}
