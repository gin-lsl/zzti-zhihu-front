import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { NewQuestionBoxComponent } from '../new-question-box/new-question-box.component';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-common-operation',
  templateUrl: './common-operation.component.html',
  styleUrls: ['./common-operation.component.less']
})
export class CommonOperationComponent implements OnInit {

  constructor(
    private _matDialog: MatDialog,
    private _userService: UserService,
    private _router: Router,
  ) { }

  ngOnInit() {
  }

  /**
   * 打开提问框
   */
  public openNewQuestionBox(): void {

    if (!this._userService.checkUserCache()) {
      this._router.navigateByUrl('/sign');
      return;
    }
    this._matDialog
      .open(NewQuestionBoxComponent, { width: '40rem', height: '80vh' })
      .afterClosed()
      .subscribe(res => {
        console.log('Dialog result: ', res);
      });
  }

}
