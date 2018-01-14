import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignService } from '../../../core/services/sign.service';
import { ErrorCodeEnum } from '../../../utils/index';
import { UserService } from '../../../core/services/user.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

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
    private _router: Router,
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
          this._router.navigateByUrl('/');
        } else {
          console.log('登录失败', ErrorCodeEnum[r.errorCode]);
        }
      });
  }

  ngOnDestroy() {
    this.userSubjectSubscription.unsubscribe();
  }

}
