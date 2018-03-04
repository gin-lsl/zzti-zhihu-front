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

  public myPostedQuestions$: Observable<any>;

  public myPostedReplies$: Observable<any>;

  public userBase$: Observable<any>;

  public myActivities$: Observable<any>;

  public mySavedQuestions$: Observable<any>;

  public followIndex: number = 0;

  public selectedIndex: number = 0;

  constructor(
    private httpClient: HttpClient,
    private store: Store<fromCoreModule.State>,
    private activatedRoute: ActivatedRoute,
  ) {
    this.myPostedQuestions$ = store.select(fromCoreModule.getUserPostedQuestions);
    this.myPostedReplies$ = store.select(fromCoreModule.getUserPostedReplies);
    this.userBase$ = store.select(fromCoreModule.getUserBase);
    this.myActivities$ = store.select(fromCoreModule.getUserActivities);
    this.mySavedQuestions$ = store.select(fromCoreModule.getUserSavedQuestions);
    this.myPostedQuestions$.subscribe(qs => {
      console.log('qs: ', qs);
    });
    this.myPostedReplies$.subscribe(rs => {
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

  public changeFollowPaneIndex(index: number) {
    this.followIndex = index;
  }

}
