import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-question-box',
  templateUrl: './new-question-box.component.html',
  styleUrls: ['./new-question-box.component.less']
})
export class NewQuestionBoxComponent implements OnInit {

  public search: string;

  public searchedList: Array<any>;

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
    ]
  }

}
