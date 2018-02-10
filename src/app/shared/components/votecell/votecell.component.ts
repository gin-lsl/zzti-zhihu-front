import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-votecell',
  templateUrl: './votecell.component.html',
  styleUrls: ['./votecell.component.less']
})
/**
 * 投票
 */
export class VotecellComponent implements OnInit {

  /**
   * 投票信息
   */
  @Input()
  public vote: any;

  constructor() { }

  ngOnInit() {
  }

}
