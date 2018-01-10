import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-answer-card',
  templateUrl: './question-answer-card.component.html',
  styleUrls: ['./question-answer-card.component.less']
})
export class QuestionAnswerCardComponent implements OnInit {

  /**
   * 只显示一部分
   */
  public isShort: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  /**
   * 切换显示方式, 全部显示或者只显示一部分
   */
  public toggleShort(): void {
    this.isShort = !this.isShort;
  }

}
