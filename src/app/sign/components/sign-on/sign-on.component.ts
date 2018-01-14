import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ErrorCodeEnum } from '../../../utils/index';
import { UserService } from '../../../core/services/user.service';
import { SignService } from '../../../core/services/sign.service';

@Component({
  selector: 'app-sign-on',
  templateUrl: './sign-on.component.html',
  styleUrls: ['./sign-on.component.less']
})
export class SignOnComponent implements OnInit, OnDestroy {

  public email: string;

  public password: string;

  public passwordRepeat: string;

  private userSubjectSub: Subscription;

  constructor(
    private _userService: UserService,
    private _signService: SignService,
    private _router: Router,
  ) { }

  ngOnInit() {
    console.log('SignOnComponent OnInit');
    this.userSubjectSub = this._userService.user$$.subscribe(r => {
      console.log('SignOnComponent: ', r);
    });
  }

  public onSubmit(): void {
    this._signService.signOn(this.email)
      .subscribe(r => {
        if (!r.success) {
          console.log('注册失败 -> errorCode: ', r.errorCode, ', errorMessage: ', r.errorMessage);
        } else {
          this._router.navigate(['/sign/active'], {
            queryParams: {
              'key': r.successResult
            }
          });
        }
      });
  }

  ngOnDestroy() {
    this.userSubjectSub.unsubscribe();
  }

}
