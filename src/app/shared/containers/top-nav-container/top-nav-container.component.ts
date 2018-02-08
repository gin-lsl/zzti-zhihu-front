import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { User, ISignIn } from '../../../utils/index';
import * as fromAuth from '../../../core/ngrx/reducers/index';
import * as authAction from '../../../core/ngrx/actions/auth.action';

@Component({
  selector: 'app-top-nav-container',
  templateUrl: './top-nav-container.component.html',
  styleUrls: ['./top-nav-container.component.less']
})
export class TopNavContainerComponent implements OnInit, AfterViewInit {

  public user$: Observable<User | ISignIn>;

  constructor(private store: Store<fromAuth.State>) {
    this.user$ = store
      .select(fromAuth.getLogedUser)
      .map(user => Object.keys(user).length > 0 ? user : null);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.store.dispatch(new authAction.CheckSignState());
  }

  public onSignOut(): void {
    this.store.dispatch(new authAction.ClearLogedUserState());
  }

}
