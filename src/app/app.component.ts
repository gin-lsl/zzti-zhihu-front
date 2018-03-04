import { Component, AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { UserService } from './core/services/user.service';
import { Store } from '@ngrx/store';
import * as userAction from './ngrx/core/actions/user.action';
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
  ) { }

  ngOnInit() {
    const user = parseUserStorage();
    if (user) {
      this._store.dispatch(new userAction.Load(user.id));
    }
  }

  ngAfterViewInit() {
    // 检测用户登录状态, 会触发Subject流推送新的值, 需要通知ng进行脏检查
    this._userService.checkUserCache();
    this._changeDetectorRef.detectChanges();
  }

}
