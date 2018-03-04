import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromCore from '../../../ngrx/core/reducers/index';
import * as authAction from '../../../ngrx/core/actions/auth.action';
import { ResponseError } from '../../../utils/index';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-page',
  templateUrl: './sign-page.component.html',
  styleUrls: ['./sign-page.component.less']
})
export class SignPageComponent implements OnDestroy {

  public authSignOnError$: Observable<string>;

  public authSignInError$: Observable<string>;

  private authSignOnActiveKeySubscription: Subscription;

  constructor(private store: Store<fromCore.State>, private router: Router) {
    this.authSignOnError$ = store.select(fromCore.getSignOnErrorMessage);
    this.authSignInError$ = store.select(fromCore.getSignInErrorMessage);
    this.authSignOnActiveKeySubscription = store.select(fromCore.getAuthActiveKey).subscribe(res => {
      console.log('res: ', res);
      if (res) {
        router.navigate(['/sign/init'], {
          queryParams: {
            key: res,
          }
        });
      }
    });
  }

  onSignInSubmit(event: { email: string, password: string }): void {
    this.store.dispatch(new authAction.SignIn(event));
  }

  onSignOnSubmit(email: string): void {
    this.store.dispatch(new authAction.SignOn(email));
  }

  ngOnDestroy() {
    this.authSignOnActiveKeySubscription && this.authSignOnActiveKeySubscription.unsubscribe();
  }

}
