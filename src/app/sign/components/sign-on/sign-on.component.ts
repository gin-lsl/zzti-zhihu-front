import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorCodeEnum } from '../../../utils/index';
import { UserService } from '../../../core/services/user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-sign-on',
  templateUrl: './sign-on.component.html',
  styleUrls: ['./sign-on.component.less']
})
export class SignOnComponent implements OnInit, OnDestroy {

  public email: string;

  public password: string;

  public passwordRepeat: string;

  private userSubjectSubscription: Subscription;

  constructor(
    private _httpClient: HttpClient,
    private _userService: UserService,
  ) { }

  ngOnInit() {
    console.log('SignOnComponent OnInit');
    this.userSubjectSubscription = this._userService.user$$.subscribe(r => {
      console.log('SignOnComponent: ', r);
    });
  }

  public onSubmit(): void {
    const body = { email: this.email, password: this.password, passwordRepeat: this.passwordRepeat };
    // alert(`'email: ', ${this.email}, ', password: ', ${this.password}`);
    this._httpClient.post('http://localhost:3000/users/signon', body)
      .subscribe((r: any) => {
        console.log('r: ', r);
        if (!r.success) {
          const errorCode = ErrorCodeEnum[r.errorCode];
          console.log('a: ', errorCode);
        }
      });
  }

  ngOnDestroy() {
    this.userSubjectSubscription.unsubscribe();
  }

}
