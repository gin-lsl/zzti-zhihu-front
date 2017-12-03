import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewQuestionBoxComponent } from '../new-question-box/new-question-box.component';

@Component({
  selector: 'app-common-operation',
  templateUrl: './common-operation.component.html',
  styleUrls: ['./common-operation.component.less']
})
export class CommonOperationComponent implements OnInit {

  constructor(
    private _matDialog: MatDialog
  ) { }

  ngOnInit() {
  }

  public openNewQuestionBox(): void {
    this._matDialog
      .open(NewQuestionBoxComponent, { width: '40rem', height: '34rem' })
      .afterClosed()
      .subscribe(res => {
        console.log('Dialog result: ', res);
      });
  }

}
