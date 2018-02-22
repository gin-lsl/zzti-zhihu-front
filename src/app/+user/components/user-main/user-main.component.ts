import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromCoreModule from '../../../ngrx/core/reducers/index';
import * as userAction from '../../../ngrx/core/actions/user.action';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.less']
})
export class UserMainComponent implements OnInit {

  public myPostQuestions$: Observable<any>;

  public myPostReplies$: Observable<any>;

  constructor(
    private httpClient: HttpClient,
    private store: Store<fromCoreModule.State>,
    private activatedRoute: ActivatedRoute
  ) {
    this.myPostQuestions$ = store.select(fromCoreModule.getUserPostedQuestions);
    this.myPostReplies$ = store.select(fromCoreModule.getUserPostedReplies);
    this.myPostQuestions$.subscribe(qs => {
      console.log('qs: ', qs);
    });
    this.myPostReplies$.subscribe(rs => {
      console.log('rs: ', rs);
    });
  }

  ngOnInit() {
    this.activatedRoute
      .paramMap
      .subscribe(param => {
        this.store.dispatch(new userAction.Load(param.get('id')));
      });
  }

  public onMyPostQuestionSortChange(newValue: string): void {
    console.log('newValue: ', newValue);
    this.store.dispatch(new userAction.ChangePostedQuestionsSort(newValue as any));
  }

}
