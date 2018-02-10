import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component';
import { ExplorePageComponent } from './components/explore-page/explore-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'explore', component: ExplorePageComponent },
      { path: '', component: HomePageComponent },
      { path: '**', redirectTo: '' }
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
