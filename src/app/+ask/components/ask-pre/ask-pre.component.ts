import {
  Component, OnInit, ViewChild, ElementRef,
  Input, EventEmitter, Output, ChangeDetectionStrategy
} from '@angular/core';
import { ESCAPE } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-ask-pre',
  templateUrl: './ask-pre.component.html',
  styleUrls: ['./ask-pre.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AskPreComponent implements OnInit {

  // public search: string;

  /** 搜索框是否获取焦点 */
  public searchBoxHasFocus: 'focus' | 'unfocus' = 'unfocus';

  @ViewChild('markTitle') private markTitleRef: ElementRef;

  @Input()
  public searchResult: Array<any>;

  @Output()
  public searchTextChange: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

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

  public onSearchTextChange(text: string): void {
    if (!text || text.trim().length === 0) {
      return;
    }
    this.searchTextChange.emit(text);
  }
}
