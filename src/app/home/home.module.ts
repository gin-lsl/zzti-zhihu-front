import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomePageComponent } from './components/home-page/home-page.component';
import { ExplorePageComponent } from './components/explore-page/explore-page.component';
import { RecommendListComponent } from './components/recommend-list/recommend-list.component';
import { RecommendCardComponent } from './components/recommend-card/recommend-card.component';

import { reducers } from './ngrx/reducers/index';
import { QuestionEffects } from './ngrx/effects/question.effect';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    StoreModule.forFeature('question', reducers),
    EffectsModule.forFeature([QuestionEffects]),
  ],
  declarations: [
    HomePageComponent,
    ExplorePageComponent,
    RecommendListComponent,
    RecommendCardComponent,
  ]
})
export class HomeModule { }
