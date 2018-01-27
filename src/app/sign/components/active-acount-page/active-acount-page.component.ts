import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-active-acount-page',
  templateUrl: './active-acount-page.component.html',
  styleUrls: ['./active-acount-page.component.less']
})
export class ActiveAcountPageComponent implements OnInit {

  public user: any;

  private access_token: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _authSerivice: AuthService,
    private _userService: UserService,
  ) { }

  ngOnInit() {
    this._activatedRoute.queryParamMap
      .switchMap(p => {
        this.access_token = p.get('key');
        return this._authSerivice.activeAcount(this.access_token);
      })
      .subscribe(r => {
        if (r.success) {
          this.user = {};
          this.user.email = r.successResult.eml;
          this.user.access_token = this.access_token;
        } else {
          // TODO: 激活失败
        }
      });
  }

  public onSubmit(): void {
    this._userService.initUser(this.user)
      .subscribe(r => {
        if (r.success) {
          this._router.navigateByUrl('/users/' + r.successResult.id);
        }
      });
  }

}
