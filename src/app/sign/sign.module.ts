import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { SignRoutingModule } from './sign-routing.module';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignOnComponent } from './components/sign-on/sign-on.component';
import { SignPageComponent } from './components/sign-page/sign-page.component';
import { SignOnResultPageComponent } from './components/sign-on-result-page/sign-on-result-page.component';
import { ActiveAcountPageComponent } from './components/active-acount-page/active-acount-page.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SignRoutingModule,
    SharedModule,
  ],
  declarations: [
    SignInComponent,
    SignOnComponent,
    SignPageComponent,
    SignOnResultPageComponent,
    ActiveAcountPageComponent,
  ]
})
export class SignModule { }
