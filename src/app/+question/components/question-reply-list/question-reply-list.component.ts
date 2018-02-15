import { Component, OnInit, Input } from '@angular/core';
import { ReplyList, Reply } from '../../../utils/index';

@Component({
  selector: 'app-question-reply-list',
  templateUrl: './question-reply-list.component.html',
  styleUrls: ['./question-reply-list.component.less']
})
export class QuestionReplyListComponent implements OnInit {

  @Input()
  public replies: Array<Reply | any>;

  constructor() { }

  ngOnInit() {
  }

}
