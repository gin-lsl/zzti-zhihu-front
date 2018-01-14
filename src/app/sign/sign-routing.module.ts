import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignPageComponent } from './components/sign-page/sign-page.component';
import { SignOnResultPageComponent } from './components/sign-on-result-page/sign-on-result-page.component';
import { ActiveAcountPageComponent } from './components/active-acount-page/active-acount-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: SignPageComponent },
      { path: 'init', component: SignOnResultPageComponent },
      { path: 'active', component: ActiveAcountPageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignRoutingModule { }
