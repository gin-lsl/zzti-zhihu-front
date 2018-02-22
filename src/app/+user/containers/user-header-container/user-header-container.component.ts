import { Component, OnInit } from '@angular/core';
import { User } from '../../../utils/index';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as userAction from '../../../ngrx/core/actions/user.action';
import * as fromCoreModule from '../../../ngrx/core/reducers/index';

@Component({
  selector: 'app-user-header-container',
  templateUrl: './user-header-container.component.html',
  styleUrls: ['./user-header-container.component.less']
})
export class UserHeaderContainerComponent implements OnInit {

  public user$: Observable<User>;

  constructor(private _store: Store<any>) {
    this.user$ = this._store.select(fromCoreModule.getUserBase);
    this._store.select(fromCoreModule.getUserBase)
      .subscribe(userbase => {
        console.log('userbase: ', userbase);
      });
  }

  ngOnInit() {
  }

  public onToggleFollow(payload: any): void {
    if (payload.hasFollowHim) {
      this._store.dispatch(new userAction.CancelFollow(payload.userId));
    } else {
      this._store.dispatch(new userAction.Follow(payload.userId));
    }
  }

}
