import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { User, ISignIn } from '../../../utils/index';
import * as fromAuth from '../../../ngrx/core/reducers/index';
import * as authAction from '../../../ngrx/core/actions/auth.action';
import * as fromMessage from '../../../ngrx/message/reducers/index';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-top-nav-container',
  templateUrl: './top-nav-container.component.html',
  styleUrls: ['./top-nav-container.component.less']
})
export class TopNavContainerComponent implements OnInit, AfterViewInit {

  public user$: Observable<User | ISignIn>;

  public message$: Observable<any>;

  constructor(private store: Store<fromAuth.State>) {
    this.user$ = store
      .select(fromAuth.getLogedUser)
      .map(user => Object.keys(user).length > 0 ? user : null);
    // this.user$.subscribe(user => {
    //   console.log('---------------------------------------------', user);
    // });
    this.message$ = this.store.select(fromMessage.getAllMessages);
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
