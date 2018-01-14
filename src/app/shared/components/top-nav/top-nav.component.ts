import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../../utils/index';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.less']
})
export class TopNavComponent implements OnInit, OnDestroy {

  /**
   * 已登录用户的用户信息
   */
  public loginedUser: User;

  public email: string;

  private user$$Subscription: Subscription;

  constructor(
    private _userService: UserService,
  ) { }

  ngOnInit() {
    // this.user$$Subscription = this._userService.user$$.subscribe(r => {
    //   console.log('最新用户信息: ', r);
    //   this.email = r.email;
    // });
    this.user$$Subscription = this._userService
      .subscribeUserWhatever$$(r => {
        if (r) {
          this.email = r.email;
        }
        this.loginedUser = r;
      });
    // .subscribeUser$$(r => {
    //   this.email = r.email;
    //   this.loginedUser = r;
    // });
  }

  ngOnDestroy() {
    this.user$$Subscription && this.user$$Subscription.unsubscribe();
  }

}
