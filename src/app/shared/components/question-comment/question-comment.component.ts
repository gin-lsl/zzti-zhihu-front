import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentList } from '../../../utils/classes/comment';

@Component({
  selector: 'app-question-comment',
  templateUrl: './question-comment.component.html',
  styleUrls: ['./question-comment.component.less']
})
export class QuestionCommentComponent implements OnInit {

  @Input()
  public commentList: CommentList & Array<any>;

  @Output()
  public submitComment: EventEmitter<string> = new EventEmitter();

  public content: string;

  constructor() { }

  ngOnInit() {
  }

  public onSubmit(): void {
    if (!this.content) {
      return;
    }
    this.submitComment.emit(this.content);
    this.content = '';
  }

}
