import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Question } from '../../../utils/index';
import { Observable } from 'rxjs/Observable';
import * as fromQuestion from '../../ngrx/reducers/index';
import * as questionAction from '../../ngrx/actions/question.action';

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})
export class HomePageComponent implements OnInit {

  public questionLoadSuccess$: Observable<any>;

  constructor(private store: Store<fromQuestion.State>) {
    this.questionLoadSuccess$ = store.select(fromQuestion.getLoadedQuestions);
  }

  ngOnInit() {
    this.store.dispatch(new questionAction.Load(10));
  }

}
