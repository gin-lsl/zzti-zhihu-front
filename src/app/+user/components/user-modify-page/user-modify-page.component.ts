import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_HOST, parseUserStorage, API } from '../../../utils/index';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/timeoutWith';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-modify-page',
  templateUrl: './user-modify-page.component.html',
  styleUrls: ['./user-modify-page.component.less']
})
export class UserModifyPageComponent implements OnInit {

  public user: any = {};

  public apiMsg$: Subject<string> = new Subject();

  constructor(
    private _httpClient: HttpClient,
    private _router: Router,
    private _location: Location,
  ) {
  }

  ngOnInit() {
  }

  onSubmit(): void {
    const user = parseUserStorage();
    if (!user) {
      this.apiMsg$.next('请先登录');
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
          this.apiMsg$.next(res.errorMessage);
        }
      });
  }

  onCancel(): void {
    this._location.back();
  }

}
