import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-reply-box',
  templateUrl: './reply-box.component.html',
  styleUrls: ['./reply-box.component.less']
})
/**
 * 通用回复框组件
 */
export class ReplyBoxComponent implements OnInit {

  /**
   * 内容对象
   */
  public content: any;

  /**
   * 提交
   */
  @Output()
  public submit: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public onSubmit(): void {
    this.submit.emit(this.content);
  }

}
