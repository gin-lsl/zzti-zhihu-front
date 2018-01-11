import { Component, OnInit, Input } from '@angular/core';
import { AnswerList } from '../../../utils/index';

@Component({
  selector: 'app-question-answer-list',
  templateUrl: './question-answer-list.component.html',
  styleUrls: ['./question-answer-list.component.less']
})
export class QuestionAnswerListComponent implements OnInit {

  @Input()
  public answers: AnswerList;

  constructor() { }

  ngOnInit() {
  }

}
