import { Component, Input } from '@angular/core';
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
  public loginedUser: User | ISignIn;

  constructor() { }

}
