import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User, API_HOST, parseUserStorage, API } from '../../../utils/index';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(private _httpClient: HttpClient) { }

  ngOnInit() {
  }

  public onToggleFollow(hasFollowHim: boolean = false): void {
    console.log('user: ', this.user);
    this.follow.emit({
      userId: this.user.id,
      hasFollowHim,
    });
  }

  onChangeAvatar(form: HTMLFormElement): void {
    const formData = new FormData(form);
    const user = parseUserStorage();
    this._httpClient.post<API>(API_HOST + '/users/modify-avatar', formData, {
      headers: new HttpHeaders().append('Authorization', user ? user.access_token : null)
    })
      .subscribe(res => {
        console.log('res: ', res);
      });
  }

}
