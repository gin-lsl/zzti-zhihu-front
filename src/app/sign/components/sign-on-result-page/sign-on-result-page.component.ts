import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * 注册成功后的激活提示页面
 */
@Component({
  selector: 'app-sign-on-result-page',
  templateUrl: './sign-on-result-page.component.html',
  styleUrls: ['./sign-on-result-page.component.less']
})
export class SignOnResultPageComponent implements OnInit {

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit() {

    this._activatedRoute.queryParamMap.subscribe(p => {
      if (!p.has('key')) {
        this._router.navigateByUrl('/');
      }
    });
  }

}
