import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { SignService } from './services/sign.service';
import { UserService } from './services/user.service';
import { reducers } from './ngrx/reducers/index';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './ngrx/effects/auth.effects';
import { UserEffects } from './ngrx/effects/user.effect';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('coreModule', reducers),
    EffectsModule.forFeature([AuthEffects, UserEffects]),
  ],
  providers: [
    SignService,
    UserService,
  ]
})
export class CoreModule { }
