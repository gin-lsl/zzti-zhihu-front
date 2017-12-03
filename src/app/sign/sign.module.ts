import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { SignRoutingModule } from './sign-routing.module';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignOnComponent } from './components/sign-on/sign-on.component';
import { SignPageComponent } from './components/sign-page/sign-page.component';

@NgModule({
  imports: [
    CommonModule,
    SignRoutingModule,
    SharedModule,
  ],
  declarations: [
    SignInComponent,
    SignOnComponent,
    SignPageComponent,
  ]
})
export class SignModule { }
