import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserMainPageComponent } from './components/user-main-page/user-main-page.component';

const routes: Routes = [
  { path: ':id', component: UserMainPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
