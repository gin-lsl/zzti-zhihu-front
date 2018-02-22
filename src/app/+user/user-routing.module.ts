import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserMainPageComponent } from './components/user-main-page/user-main-page.component';
import { UserModifyPageComponent } from './components/user-modify-page/user-modify-page.component';

const routes: Routes = [
  { path: 'modify', component: UserModifyPageComponent },
  { path: ':id', component: UserMainPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
