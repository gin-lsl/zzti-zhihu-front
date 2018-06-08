import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { API, API_HOST, User, parseUserStorage } from '../../../utils/index';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.less']
})
export class UserHeaderComponent implements OnInit {

  _newAvatar: string;

  @Input()
  public user: User & any;

  @Output()
  public follow: EventEmitter<any> = new EventEmitter();

  @ViewChild('inputAvatar')
  public inputAvatar: ElementRef;

  public hasLogin: boolean = false;

  constructor(private _httpClient: HttpClient) { }

  ngOnInit() {
    const user = parseUserStorage();
    if (user && user.id === this.user.id) {
      this.hasLogin = true;
    } else {
      this.hasLogin = false;
    }
  }

  public onToggleFollow(hasFollowHim: boolean = false): void {
    console.log('user: ', this.user);
    this.follow.emit({
      userId: this.user.id,
      hasFollowHim,
    });
  }

  onClickAvatar() {
    this.inputAvatar && this.inputAvatar.nativeElement.click();
  }

  onChangeAvatar(form: HTMLFormElement): void {
    const formData = new FormData(form);
    const user = parseUserStorage();
    this._httpClient.post<API>(API_HOST + '/users/modify-avatar', formData, {
      headers: new HttpHeaders().append('Authorization', user ? user.access_token : null)
    })
      .subscribe(res => {
        // console.log('res: ', res);
        // if (res.success && res.successResult) {
        //   this._newAvatar = 'preavatar';
        //   setTimeout(() => {
        //     this._newAvatar = API_HOST + '/users/avatar/' + res.successResult.avatar;
        //   });
        // }
        location.reload();
      });
  }

}
