import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import * as userAction from '../../../ngrx/core/actions/user.action';
import * as fromUserModule from '../../../ngrx/core/reducers/index';

@Component({
  selector: 'app-user-side',
  templateUrl: './user-side.component.html',
  styleUrls: ['./user-side.component.less']
})
export class UserSideComponent implements OnInit, OnDestroy {

  public userInformationTotal: any;

  private userInformationTotal$: Subscription;

  constructor(
    private _store: Store<any>
  ) { }

  ngOnInit() {
    this.userInformationTotal$ = this._store.select(fromUserModule.getUserInformationTotal).subscribe(user => {
      this.userInformationTotal = user;
    });
  }

  ngOnDestroy() {
    this.userInformationTotal$.unsubscribe();
  }

}
