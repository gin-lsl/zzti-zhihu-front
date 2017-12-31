import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-question-detail-description',
  templateUrl: './question-detail-description.component.html',
  styleUrls: ['./question-detail-description.component.less']
})
export class QuestionDetailDescriptionComponent implements OnInit {

  @Input()
  public question: any;

  constructor() { }

  ngOnInit() {
  }

}
