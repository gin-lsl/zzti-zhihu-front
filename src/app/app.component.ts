import { Component, AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserService } from './core/services/user.service';
import * as userAction from './ngrx/core/actions/user.action';
import * as authAction from './ngrx/core/actions/auth.action';
import * as messageAction from './ngrx/message/actions/message.action';
import { parseUserStorage } from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, AfterViewInit {

  year = new Date().getFullYear();

  constructor(
    private _userService: UserService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _store: Store<any>,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit() {
    const user = parseUserStorage();
    if (user) {
      this._store.dispatch(new authAction.Load(user.id));
    }
    this._router.events.filter(e => e instanceof NavigationEnd).subscribe(() => {
      this._store.dispatch(new messageAction.Load());
      this._store.dispatch(new authAction.LoadUserInformation());
    });
  }

  ngAfterViewInit() {
    // 检测用户登录状态, 会触发Subject流推送新的值, 需要通知ng进行脏检查
    this._userService.checkUserCache();
    this._changeDetectorRef.detectChanges();
  }

}
