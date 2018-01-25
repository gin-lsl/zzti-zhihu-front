import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Question } from '../../../utils/index';

/**
 * 对问题点赞或取消
 */
export interface QuestionUpOrCancel {

  /**
   * 是否是点赞
   */
  isUp: boolean;

  /**
   * 问题id
   */
  questionId: string;
}

@Component({
  selector: 'app-recommend-list',
  templateUrl: './recommend-list.component.html',
  styleUrls: ['./recommend-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecommendListComponent implements OnInit {

  @Input()
  public questions: Array<Question>;

  /**
   * 对问题点赞或取消事件
   */
  @Output()
  public upOrCancelAction: EventEmitter<QuestionUpOrCancel> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  /**
   * 对问题点赞
   * @param questionId 问题id
   */
  public onUpOrCancelQuestion(questionId: string, isUp: boolean): void {
    this.upOrCancelAction.emit({ questionId, isUp });
  }

}
