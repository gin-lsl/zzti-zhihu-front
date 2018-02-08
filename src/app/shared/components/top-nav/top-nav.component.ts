import { Component, Input, EventEmitter, Output } from '@angular/core';
import { User, ISignIn } from '../../../utils/index';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.less']
})
export class TopNavComponent {

  /**
   * 已登录用户的用户信息
   */
  @Input()
  public loginedUser: User | ISignIn | any = {};

  @Output()
  public signOut: EventEmitter<any> = new EventEmitter();

  constructor() { }

  public onExit(): void {
    this.signOut.emit();
  }

}
