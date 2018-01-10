import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-answer-list',
  templateUrl: './question-answer-list.component.html',
  styleUrls: ['./question-answer-list.component.less']
})
export class QuestionAnswerListComponent implements OnInit {

  public answers: Array<any> = new Array(6);

  constructor() { }

  ngOnInit() {
  }

}
