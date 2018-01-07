import { Component, OnInit } from '@angular/core';
import { SignService } from '../../../core/services/sign.service';

@Component({
  selector: 'app-sign-page',
  templateUrl: './sign-page.component.html',
  styleUrls: ['./sign-page.component.less']
})
export class SignPageComponent implements OnInit {

  constructor(
    private _signService: SignService,
  ) { }

  ngOnInit() {
  }

}
