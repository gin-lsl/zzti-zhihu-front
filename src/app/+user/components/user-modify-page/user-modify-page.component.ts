import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_HOST, parseUserStorage, API } from '../../../utils/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-modify-page',
  templateUrl: './user-modify-page.component.html',
  styleUrls: ['./user-modify-page.component.less']
})
export class UserModifyPageComponent implements OnInit {

  public user: any = {};

  constructor(
    private _httpClient: HttpClient,
    private _router: Router,
  ) { }

  ngOnInit() {
  }

  onSubmit(): void {
    const user = parseUserStorage();
    if (!user) {
      console.log('用户没有登录');
      return;
    }
    this._httpClient
      .post(API_HOST + '/users/modify', this.user, {
        headers: new HttpHeaders().append('Authorization', user.access_token)
      })
      .subscribe((res: API) => {
        if (res.success) {
          this._router.navigateByUrl('/user/' + res.successResult.id);
        } else {
          console.log('更新失败');
        }
      });
  }

}
