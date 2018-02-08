import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromCoreModule from '../../../core/ngrx/reducers/index';
import * as userAction from '../../../core/ngrx/actions/user.action';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.less']
})
export class UserMainComponent implements OnInit {

  public myPostQuestions$: Observable<any>;

  constructor(
    private httpClient: HttpClient,
    private store: Store<fromCoreModule.State>,
    private activatedRoute: ActivatedRoute
  ) {
    // this.myPostQuestions$ = store.select(fromCoreModule.selectUserState);
    this.myPostQuestions$ = store.select(fromCoreModule.getUserPostedQuestions);
    this.myPostQuestions$.subscribe(state => {
      console.log('state: ', state);
    });
  }

  ngOnInit() {
    // this.httpClient
    //   .get('http://localhost:3000/questions')
    //   .subscribe((r: any) => {
    //     console.log('r: ', r);
    //     // this.questions = r.successResult;
    //   });
    this.activatedRoute
      .paramMap
      .subscribe(param => {
        this.store.dispatch(new userAction.Load(param.get('id')));
      });
  }

  onMyPostQuestionSortChange(newValue: string): void {
    console.log('newValue: ', newValue);
    this.store.dispatch(new userAction.ChangePostedSort(newValue as any));
  }

}
