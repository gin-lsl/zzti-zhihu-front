import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements AfterViewInit {
  title = 'app';

  constructor(
    private _userService: UserService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngAfterViewInit() {
    // 检测用户登录状态, 会触发Subject流推送新的值, 需要通知ng进行脏检查
    this._userService.checkUserCache();
    this._changeDetectorRef.detectChanges();
  }

}
