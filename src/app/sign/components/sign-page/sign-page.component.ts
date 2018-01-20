import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromCore from '../../../core/ngrx/reducers/index';
import * as authAction from '../../../core/ngrx/actions/auth.action';
import { ResponseError } from '../../../utils/index';

@Component({
  selector: 'app-sign-page',
  templateUrl: './sign-page.component.html',
  styleUrls: ['./sign-page.component.less']
})
export class SignPageComponent {

  public authSignOnError$: Observable<ResponseError>;

  public authSignInError$: Observable<ResponseError>;

  constructor(private store: Store<fromCore.State>) {
    this.authSignOnError$ = store.select(fromCore.getSignOnError);
    this.authSignInError$ = store.select(fromCore.getSignInError);
  }

  onSignInSubmit(event: { email: string, password: string }): void {
    this.store.dispatch(new authAction.SignIn(event));
  }

  onSignOnSubmit(email: string): void {
    this.store.dispatch(new authAction.SignOn(email));
  }

}
