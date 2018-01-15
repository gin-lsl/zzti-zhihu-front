import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { ACCESS_TOKEN, API_HOST } from '../../../utils/index';
import { MatChipInputEvent } from '@angular/material';

@Component({
  selector: 'app-ask-page',
  templateUrl: './ask-page.component.html',
  styleUrls: ['./ask-page.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AskPageComponent implements OnInit {

  public questionModel: any;

  public separatorKeyCodes = [ENTER, COMMA];

  constructor(
    private _httpClient: HttpClient,
  ) { }

  ngOnInit() {
    this.questionModel = {};
  }

  public onSubmit(): void {
    console.log('questionModel: ', this.questionModel);
    const access_token = localStorage.getItem(ACCESS_TOKEN);
    // this._httpClient
    //   .post(API_HOST + '/questions/post', this.questionModel, {
    //     headers: new HttpHeaders().append('Authorization', access_token)
    //   })
    //   .subscribe(r => {
    //     console.log('r: ', r);
    //   });
  }

  public remove(tagIndex: number): void {
    if (this.questionModel.tags && this.questionModel.tags.length) {
      ((this.questionModel.tags) as Array<any>).splice(tagIndex, 1);
    }
  }

  public add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = (event.value || '').trim();

    if (!this.questionModel.tags) {
      this.questionModel.tags = [];
    }

    if (this.questionModel.tags.length >= 5) {
      return;
    }

    if (value) {
      console.log('test: ', value);
      this.questionModel.tags.push(value);
    }

    if (input) {
      input.value = '';
    }
  }

}
