import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomePageComponent } from './components/home-page/home-page.component';
import { ExplorePageComponent } from './components/explore-page/explore-page.component';
import { RecommendListComponent } from './components/recommend-list/recommend-list.component';
import { RecommendCardComponent } from './components/recommend-card/recommend-card.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
  ],
  declarations: [
    HomePageComponent,
    ExplorePageComponent,
    RecommendListComponent,
    RecommendCardComponent,
  ]
})
export class HomeModule { }
