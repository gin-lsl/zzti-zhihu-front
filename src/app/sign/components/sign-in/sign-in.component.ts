import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignService } from '../../../core/services/sign.service';
import { ErrorCodeEnum } from '../../../utils/index';
import { UserService } from '../../../core/services/user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit, OnDestroy {

  /**
   * 邮箱
   */
  public email: string;

  /**
   * 密码
   */
  public password: string;

  private userSubjectSubscription: Subscription;

  constructor(
    private _signService: SignService,
    private _userService: UserService,
  ) { }

  ngOnInit() {
    console.log('SignInComponent OnInit');
    this.userSubjectSubscription = this._userService.user$$.subscribe(r => {
      console.log('SignInComponent: ', r);
    });
  }

  /**
   * 登录
   */
  public onSubmit(): void {
    this._signService.signIn(this.email, this.password)
      .subscribe(r => {
        console.log('r: ', r);
        if (r.success) {
          console.log('登录成功');
        } else {
          console.log('登录失败', ErrorCodeEnum[r.errorCode]);
        }
      });
    console.log('模拟登录成功,推入新的用户信息值');
  }

  ngOnDestroy() {
    this.userSubjectSubscription.unsubscribe();
  }

}
