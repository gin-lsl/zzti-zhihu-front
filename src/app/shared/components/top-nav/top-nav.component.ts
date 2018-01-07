import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.less']
})
export class TopNavComponent implements OnInit, OnDestroy {

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
      .subscribeUser$$(r => {
        this.email = r.email;
      });
  }

  ngOnDestroy() {
    this.user$$Subscription && this.user$$Subscription.unsubscribe();
  }

}
