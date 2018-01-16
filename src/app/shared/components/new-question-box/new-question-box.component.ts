import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ESCAPE } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-new-question-box',
  templateUrl: './new-question-box.component.html',
  styleUrls: ['./new-question-box.component.less'],
  animations: [
    trigger('searchBoxState', [
      state('focus', style({
        color: 'black',
      })),
      state('unfocus', style({
        color: 'red'
      })),
      transition('focus => unfocus', animate('1500ms ease-in')),
      transition('unfocus => focus', animate('1500ms ease-out'))
    ])
  ]
})
export class NewQuestionBoxComponent implements OnInit {

  public search: string;

  public searchedList: Array<any>;

  /** 搜索框是否获取焦点 */
  public searchBoxHasFocus: 'focus' | 'unfocus' = 'unfocus';

  @ViewChild('markTitle') private markTitleRef: ElementRef;

  constructor() { }

  ngOnInit() {
    this.searchedList = [
      'lorem loremlorem loremlorem loremlorem loremlorem loremlorem lorem',
      'test texttest texttest texttest texttest texttest texttest texttest texttest texttest texttest text',
      '测试文本标题 测试文本标题 测试文本标题 测试文本标题 测试文本标题 测试文本标题 测试文本标题 测试文本标题 测试文本标题 测试文本标题 ',
      '多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题',
      '呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, ',
      '多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题',
      '呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, ',
      '多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题',
      '呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, ',
      '多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题',
      '多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题多余的问题',
      '呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, 呵呵哒, ',
    ];
  }

  public toggleFocusState(): void {
    this.searchBoxHasFocus = this.searchBoxHasFocus === 'focus' ? 'unfocus' : 'focus';
  }

  public onSearchBoxFocus(): void {
    this.searchBoxHasFocus = 'focus';
  }

  public onSearchBoxUnfocus(): void {
    this.searchBoxHasFocus = 'unfocus';
  }

  public _keydown(event: KeyboardEvent): void {
    const code = event.keyCode;
    if (code === ESCAPE) {
      this.searchBoxHasFocus = 'unfocus';
      if (this.markTitleRef) {
        // this.markTitleRef.focus();
        (this.markTitleRef.nativeElement as HTMLHeadElement).click();
      }
      event.stopImmediatePropagation();
      event.stopPropagation();
    }
  }

}
