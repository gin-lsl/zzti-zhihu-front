import {
  createFeatureSelector as cfs,
  createSelector as cs,
  ActionReducerMap
} from '@ngrx/store';
import * as fromRoot from '../../../ngrx/reducers/index';
import * as fromAuth from './auth.reducer';
import * as fromUser from './user.reducer';

export interface CoreModuleState {
  auth: fromAuth.State;
  user: fromUser.State;
}

export interface State extends fromRoot.State {
  coreModule: CoreModuleState;
}

export const reducers: ActionReducerMap<CoreModuleState> = {
  auth: fromAuth.reducer,
  user: fromUser.reducer,
};

export const selectCoreModuleState = cfs<CoreModuleState>('coreModule');

export const selectAuthState = cs(selectCoreModuleState, state => state.auth);

export const selectUserState = cs(selectCoreModuleState, state => state.user);

export const getUserPostedSort = cs(selectCoreModuleState, state => state.user.postedSort);

export const getUserPostedQuestions = cs(selectCoreModuleState, getUserPostedSort, (state, sort) => {
  if (state.user.user) {
    const postedQuestions = ((state.user.user as any).postedQuestions as Array<any>);
    if (sort === 'NEWER_TO_OLDER') {
      return postedQuestions.sort((p, c) => ((new Date(p.postDateTime) as any) - (new Date(c.postDateTime) as any)));
    } else if (sort === 'OLDER_TO_NEWER') {
      return postedQuestions.sort((p, c) => ((new Date(c.postDateTime) as any) - (new Date(p.postDateTime) as any)));
    } else if (sort === 'AGREE') {
      return postedQuestions.sort((p, c) => (c.upUserIds.length - p.upUserIds.length));
    }
  } else {
    return [];
  }
});

export const getSignedIn = cs(selectAuthState, fromAuth.getSignedIn);

export const getLogedUser = cs(selectAuthState, fromAuth.getUser);

export const getSignOnError = cs(selectAuthState, fromAuth.getSignOnError);

export const getSignInError = cs(selectAuthState, fromAuth.getSignInError);

export const getUser = cs(selectUserState, fromUser.getUser);
