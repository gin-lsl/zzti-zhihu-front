import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { UserRoutingModule } from './user-routing.module';
import { UserMainPageComponent } from './components/user-main-page/user-main-page.component';
import { UserHeaderComponent } from './components/user-header/user-header.component';
import { UserBodyComponent } from './components/user-body/user-body.component';
import { UserMainComponent } from './components/user-main/user-main.component';
import { UserSideComponent } from './components/user-side/user-side.component';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './ngrx/effects/user.effect';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    // EffectsModule.forFeature([UserEffects]),
  ],
  declarations: [
    UserMainPageComponent,
    UserHeaderComponent,
    UserBodyComponent,
    UserMainComponent,
    UserSideComponent,
  ]
})
export class UserModule { }
