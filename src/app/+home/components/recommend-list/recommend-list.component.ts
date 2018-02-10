import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Question } from '../../../utils/index';

/**
 * 问题操作负载
 */
export interface QuestionActionPayload {

  /**
   * 是否是正义词(点赞\收藏等)
   */
  isTrue: boolean;

  /**
   * 问题id
   */
  id: string;
}

@Component({
  selector: 'app-recommend-list',
  templateUrl: './recommend-list.component.html',
  styleUrls: ['./recommend-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecommendListComponent implements OnInit {

  @Input()
  public questions: Array<Question | any>;

  /**
   * 对问题点赞或取消事件
   */
  @Output()
  public upOrCancelAction: EventEmitter<QuestionActionPayload> = new EventEmitter();

  /**
   * 反对问题或取消的事件
   */
  @Output()
  public downOrCancelAction: EventEmitter<QuestionActionPayload> = new EventEmitter();

  /**
   * 收藏或取消收藏的事件
   */
  @Output()
  public likeOrUnlikeAction: EventEmitter<QuestionActionPayload> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  /**
   * 对问题点赞
   * @param id 问题id
   * @param isTrue 是否是点赞
   */
  public onUpOrCancelQuestion(id: string, isTrue: boolean): void {
    this.upOrCancelAction.emit({ id, isTrue });
  }

  /**
   * 反对或取消
   * @param id 问题id
   * @param isTrue 是否是反对
   */
  public onDownOrCancelQuestion(id: string, isTrue: boolean): void {
    this.downOrCancelAction.emit({ id, isTrue });
  }

  /**
   * 收藏或取消收藏
   * @param id 问题id
   * @param isLike 是否是收藏
   */
  public onLikeOrUnlikeQuestion(id: string, isLike: boolean): void {
    this.likeOrUnlikeAction.emit({ id, isTrue: isLike });
  }

}
