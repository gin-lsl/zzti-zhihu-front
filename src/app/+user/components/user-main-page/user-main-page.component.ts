import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as userAction from '../../../ngrx/core/actions/user.action';
import * as fromUser from '../../../ngrx/core/reducers/user.reducer';
import * as fromCore from '../../../ngrx/core/reducers/index';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../utils/index';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user-main-page',
  templateUrl: './user-main-page.component.html',
  styleUrls: ['./user-main-page.component.less']
})
export class UserMainPageComponent implements OnInit, OnDestroy {

  public user$: Observable<User>;

  private paramMapSubscription: Subscription;

  constructor(
    private store: Store<fromUser.State>,
    private activatedRoute: ActivatedRoute,
  ) {
    this.user$ = store.select(fromCore.getUser);
  }

  ngOnInit() {
    this.paramMapSubscription = this.activatedRoute
      .paramMap
      .subscribe(paramMap => {
        const id = paramMap.get('id');
        if (id) {
          this.store.dispatch(new userAction.Load(id));
        } else {
          this.store.dispatch(new userAction.LoadFailure('用户不存在'));
        }
      });
  }

  ngOnDestroy() {
    this.paramMapSubscription && this.paramMapSubscription.unsubscribe();
  }

}
