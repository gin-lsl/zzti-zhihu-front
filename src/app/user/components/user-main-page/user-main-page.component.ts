import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as userAction from '../../../core/ngrx/actions/user.action';
import * as fromUser from '../../../core/ngrx/reducers/user.reducer';
import * as fromCore from '../../../core/ngrx/reducers/index';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../utils/index';

@Component({
  selector: 'app-user-main-page',
  templateUrl: './user-main-page.component.html',
  styleUrls: ['./user-main-page.component.less']
})
export class UserMainPageComponent implements OnInit {

  @Input()
  public user$: Observable<User>;

  constructor(private store: Store<fromUser.State>) {
    this.user$ = store.select(fromCore.getLogedUser);
  }

  ngOnInit() {
  }

}
