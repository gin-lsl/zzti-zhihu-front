import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../../../utils/index';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.less']
})
export class UserHeaderComponent implements OnInit {

  @Input()
  public user: User;

  @Output()
  public follow: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public onToggleFollow(hasFollowHim: boolean = false): void {
    console.log('user: ', this.user);
    this.follow.emit({
      userId: this.user.id,
      hasFollowHim,
    });
  }

  public onChangeAvatar(event: any): void {
    console.log('event: ', event);
  }

}
