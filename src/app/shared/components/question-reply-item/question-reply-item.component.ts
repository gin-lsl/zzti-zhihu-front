import { Component, OnInit, Input } from '@angular/core';
import { Reply } from '../../../utils/index';

@Component({
  selector: 'app-question-reply-item',
  templateUrl: './question-reply-item.component.html',
  styleUrls: ['./question-reply-item.component.less']
})
export class QuestionReplyItemComponent implements OnInit {

  @Input()
  public reply: Reply & any;

  public showCommentList: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public toggleShowCommentList(): void {
    this.showCommentList = !this.showCommentList;
  }
}
