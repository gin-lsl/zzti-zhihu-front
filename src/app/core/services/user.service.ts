import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ISignIn } from '../../utils/index';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';

@Injectable()
export class UserService {

  /**
   * 用户信息 `BehaviorSubject` 流, 订阅之后可以获取当前用户最新数据
   */
  public user$$: BehaviorSubject<ISignIn> = new BehaviorSubject<ISignIn>(null);

  /**
   * 登录用户的用户信息
   */
  public signedUser: ISignIn;

  constructor() { }

  /**
   * 订阅最新的用户信息数据, 过滤了空值
   *
   * @param next nextCallback
   * @param error errorCallback
   * @param complete completeCallback
   */
  public subscribeUser$$(next?: (value: ISignIn) => void, error?: (error: any) => void, complete?: () => void): Subscription {
    return this.user$$.filter(p => p !== null).subscribe(next, error, complete);
  }

  /**
   * 订阅最新的用户信息数据, 没有过滤空值, 需要自己判断
   *
   * @param next nextCallback
   * @param error errorCallback
   * @param complete completeCallback
   */
  public subscribeUserWhatever$$(next?: (value: ISignIn) => void, error?: (error: any) => void, complete?: () => void): Subscription {
    return this.user$$.subscribe(next, error, complete);
  }

}
